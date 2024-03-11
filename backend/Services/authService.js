const accountModel = require("../models/accountModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../configuration/config");

class AuthService {
    static async login(email, password, cookies, res) {
        try {
            if (!email || !password) {
                throw new Error("Missing Credentials");
            }

            const account = await accountModel.findOne({ email });
            if (!account) {
                throw new Error("User not found");
            }

            const match = await bcrypt.compare(password, account.password);
            if (!match) {
                throw new Error("Incorrect Password");
            }

            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: account.username,
                        role: account.userRole,
                    },
                },
                config.ACCESS_TOKEN,
                { expiresIn: "20m" }
            );

            const newRefreshToken = jwt.sign(
                { username: account.username },
                config.REFRESH_TOKEN,
                { expiresIn: "3d" }
            );

            let newRefreshTokenArray = !cookies?.jwt
                ? account.refreshToken
                : account.refreshToken.filter((rt) => rt !== cookies.jwt);

            if (cookies?.jwt) {
                const refreshToken = cookies.jwt;
                const foundToken = await accountModel.findOne({ refreshToken }).exec();
                if (!foundToken) {
                    newRefreshTokenArray = [];
                }
                res.clearCookie("jwt", {
                    httpOnly: true,
                    sameSite: "None",
                    secure: true,
                });
            }

            account.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            await account.save();

            return {
                id: account._id,
                userRole: account.userRole,
                username: account.username,
                token: accessToken,
                message: "Login Successful",
                newRefreshToken,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }


    static async logout(cookies) {
        try {
            const refreshToken = cookies.jwt;

            const user = await accountModel.findOne({ refreshToken }).exec();
            if (!user) {
                return;
            }

            user.refreshToken = user.refreshToken.filter((rt) => rt !== refreshToken);
            await user.save();

            return;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async handleRefreshToken(req, res) {
        try {
            const cookies = req.cookies;
            if (!cookies?.jwt) {
                throw new Error("Unauthorized");
            }
            const refreshToken = cookies.jwt;
            res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

            const user = await accountModel.findOne({ refreshToken }).exec();

            if (!user) {
                jwt.verify(refreshToken, config.REFRESH_TOKEN, async (err, decoded) => {
                    if (err) {
                        throw new Error("Invalid or expired token");
                    }
                    const hackedUser = await accountModel
                        .findOne({ username: decoded.username })
                        .exec();
                    hackedUser.refreshToken = [];
                    await hackedUser.save();
                });
                throw new Error("Unauthorized");
            }

            const newRefreshTokenArray = user.refreshToken.filter(
                (rt) => rt !== refreshToken
            );

            jwt.verify(refreshToken, config.REFRESH_TOKEN, async (err, decoded) => {
                if (err) {
                    user.refreshToken = [...newRefreshTokenArray];
                    await user.save();
                    throw new Error("Unauthorized");
                }
                if (err || user.username !== decoded.username) {
                    throw new Error("Unauthorized");
                }

                const accessToken = jwt.sign(
                    {
                        UserInfo: {
                            username: decoded.username,
                        },
                    },
                    config.ACCESS_TOKEN,
                    { expiresIn: "20m" }
                );

                const newRefreshToken = jwt.sign(
                    { username: user.username },
                    config.REFRESH_TOKEN,
                    { expiresIn: "3d" }
                );

                user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
                await user.save();

                res.cookie("jwt", newRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 24 * 60 * 60 * 1000,
                });

                res.json({ accessToken });
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = AuthService;