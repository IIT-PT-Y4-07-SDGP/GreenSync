const accountModel = require("../models/accountModel");
const userModel = require("../models/userModel");
const PRCModel = require("../models/PRCModel");
const MCModel = require("../models/MCModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../configuration/config");

class AuthService {
    static async login(userIdentity, password, cookies, res) {
        try {
            if (!userIdentity || !password) {
                throw new Error("Missing Credentials");
            }

            //get related account
            const account = await accountModel.findOne({email: userIdentity}) || await accountModel.findOne({username: userIdentity});
            if (!account) {
                throw new Error("User not found");
            }

            //comapre the inputted password with the hashed password
            const match = await bcrypt.compare(password, account.password);
            if (!match) {
                throw new Error("Incorrect Password");
            }

            //generate access and refresh tokens
            const tokens = this.generateJWTToken(account.username, account.userRole);
            const accessToken = tokens.accessToken;
            const newRefreshToken = tokens.refreshToken;

        
            let newRefreshTokenArray = !cookies?.jwt
                ? account.refreshToken
                : account.refreshToken.filter((rt) => rt !== cookies.jwt);

            
            if (cookies?.jwt) {
                const refreshToken = cookies.jwt;
                //find account from refresh token preent in req cookie
                const foundToken = await accountModel.findOne({refreshToken}).exec();
                if (!foundToken) {
                    newRefreshTokenArray = [];
                }
                //clear the cookie
                res.clearCookie("jwt", {
                    httpOnly: true,
                    sameSite: "None",
                    secure: true,
                });
            }

            account.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            await account.save();

            const userRole = account.userRole;

            //dynamically fetch user details based on role
            if (userRole == "GP") {
                let userDetails = await userModel.findOne({account: account.id});
                return {
                    "_id": userDetails.id,
                    "firstName": userDetails.firstName,
                    "lastName": userDetails.lastName,
                    "points": userDetails.points,
                    "profilePic": userDetails.profilePic,
                    "address": userDetails.address,
                    "participatedEvents":userDetails.participatedEvents,
                    "account": {
                        "_id": account.id,
                        "username": account.username,
                        "phoneNumber": account.phoneNumber,
                        "userRole": account.userRole,
                        "email": account.email,
                        "accountStatus": account.accountStatus,
                        "accessToken": accessToken,
                        "refreshToken": newRefreshToken
                    },
                }
            } else if (userRole == "PRC-ADMIN") {
                let PRC = await PRCModel.findOne({account: account.id});
                return {
                    "_id": PRC.id,
                    "PRCName": PRC.PRCName,
                    "PRCBusinessRegNumber": PRC.PRCBusinessRegNumber,
                    "District": PRC.District,
                    "Address": PRC.Address,
                    "PRCStatus": PRC.PRCStatus,
                    "account": {
                        "_id": account.id,
                        "username": account.username,
                        "phoneNumber": account.phoneNumber,
                        "userRole": account.userRole,
                        "email": account.email,
                        "accountStatus": account.accountStatus,
                        "accessToken": accessToken,
                        "refreshToken": newRefreshToken
                    },
                }
            } else if (userRole == "MC-ADMIN") {
                let MC = await MCModel.findOne({account: account.id});
                return {
                    "_id": MC.id,
                    "MCName": MC.MCName,
                    "District": MC.District,
                    "Address": MC.Address,
                    "MCStatus": MC.MCStatus,
                    "account": {
                        "_id": account.id,
                        "username": account.username,
                        "phoneNumber": account.phoneNumber,
                        "userRole": account.userRole,
                        "email": account.email,
                        "accountStatus": account.accountStatus,
                        "accessToken": accessToken,
                        "refreshToken": newRefreshToken
                    }
                }
            } else if (userRole == 'DRIVER') {
                let userDetails = await userModel.findOne({account: account.id});
                return {
                    "_id": userDetails.id,
                    "firstName": userDetails.firstName,
                    "lastName": userDetails.lastName,
                    "points": userDetails.points,
                    "profilePic": userDetails.profilePic,
                    "address": userDetails.address,
                    "account": {
                        "_id": account.id,
                        "username": account.username,
                        "phoneNumber": account.phoneNumber,
                        "userRole": account.userRole,
                        "email": account.email,
                        "accountStatus": account.accountStatus,
                        "accessToken": accessToken,
                        "refreshToken": newRefreshToken
                    },
                }
            }
                // else if(userRole == "SYSTEM-ADMIN"){

            // } 
            else {
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }

    static generateJWTToken(username, role) {
        let accessToken = jwt.sign(
            {
                UserInfo: {
                    username: username,
                    role: role,
                },
            },
            config.ACCESS_TOKEN_SECRET,
            {expiresIn: "20m"}
        )

        let refreshToken = jwt.sign(
            {username: username},
            config.REFRESH_TOKEN_SECRET,
            {expiresIn: "3d"}
        );

        return {accessToken: accessToken, refreshToken: refreshToken}
    }


    static async logout(cookies) {
        try {
            const refreshToken = cookies.jwt;

            const user = await accountModel.findOne({refreshToken}).exec();
            if (!user) {
                return;
            }
            //clear out refresh token from record
            user.refreshToken = user.refreshToken.filter((rt) => rt !== refreshToken);
            await user.save();

            return;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async handleRefreshToken(req, res) {
        try {
            //obtain refresh token from cookie
            const cookies = req.cookies;
            if (!cookies?.jwt) {
                throw new Error("Unauthorized");
            }
            const refreshToken = cookies.jwt;
            res.clearCookie("jwt", {httpOnly: true, sameSite: "None", secure: true});

            const user = await accountModel.findOne({refreshToken}).exec();

            if (!user) {
                jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, async (err, decoded) => {
                    if (err) {
                        throw new Error("Invalid or expired token");
                    }

                    //if the token is valid but there is no user associated to it currently
                    const hackedUser = await accountModel
                        .findOne({username: decoded.username})
                        .exec();
                    hackedUser.refreshToken = [];
                    await hackedUser.save();
                });
                throw new Error("Unauthorized");
            }

            //create new array excluding the provided refresh token
            const newRefreshTokenArray = user.refreshToken.filter(
                (rt) => rt !== refreshToken
            );

            jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, async (err, decoded) => {
                if (err) {
                    user.refreshToken = [...newRefreshTokenArray];
                    await user.save();
                    throw new Error("Unauthorized");
                }
                if (err || user.username !== decoded.username) {
                    throw new Error("Unauthorized");
                }

                //create new access token
                const accessToken = jwt.sign(
                    {
                        UserInfo: {
                            username: decoded.username,
                        },
                    },
                    config.ACCESS_TOKEN_SECRET,
                    {expiresIn: "20m"}
                );

                //create new refresh token
                const newRefreshToken = jwt.sign(
                    {username: user.username},
                    config.REFRESH_TOKEN_SECRET,
                    {expiresIn: "3d"}
                );

                //add the new refresh token to the refresh tokens array
                user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
                await user.save();

                //set the new refresh token in the response cookie
                res.cookie("jwt", newRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 24 * 60 * 60 * 1000,
                });

                res.json({accessToken});
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = AuthService;
