const userModel = require("../models/userModel");
const accountModel = require("../models/accountModel");
// const sendEmail = require("../middlewears/email");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config=require("../configuration/config")

const createToken = () => {
  
};

const login = async (req, res) => {
  try {
    // Getting the JWT from cookies
    const cookies = req.cookies;
    // User Entered Email and Password
    const { email, password } = req.body;
    // Checking the required parameters are passed
    if (!email || !password) return res.status(404).json({ error: "Missing Credentials" });

    // Getting the account details by email and sends 404 if user not found
    const account=await accountModel.findOne({email})
    if (!account) return res.status(404).json({ error: "User not found" });
    
    // Validates the password and pass an error if it didn't match
    const match = await bcrypt.compare(password,account.password); 
    if (!match) return res.status(401).json({ error: "Incorrect Password" });

    // Generate Access token
    const accessToken = createToken({
      UserInfo: {
        username: account.username,
        role: account.userRole,
      },
    }, "20m")
    
    // generate refresh token
    const newRefreshToken = jwt.sign(
      { username: account.username},
        config.REFRESH_TOKEN,
      { expiresIn: "3d" }
    );

    // creates an array with refresh token and gets all the refresh tokens without the existing token
    let newRefreshTokenArray = !cookies?.jwt
      ? account.refreshToken
      : account.refreshToken.filter((rt) => rt !== cookies.jwt);

    // when user have already logged to the system and again try to login the jwt will token will be cleared
    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await accountModel.findOne({ refreshToken }).exec();
      console.log(foundToken);
      // User logs into the system first time
      if (!foundToken) { newRefreshTokenArray = []; }
      // clears jwt token
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    // add the new token to the db
    account.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await account.save();

    // add the new refresh token to the cookie
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { _id, userRole, username} = account;
    
    // respond login is successful and pass the access token
    res.status(200).json({
      id: _id,
      userRole,
      username,
      token: accessToken,
      message: "Login Successful",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const user = await accountModel.findOne({ refreshToken }).exec();
  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  user.refreshToken = user.refreshToken.filter((rt) => rt !== refreshToken);
  const result = await user.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    const user = await accountModel.findOne({ refreshToken }).exec();
    console.log(user);
    // Detected refresh token reuse!
    if (!user) {
        jwt.verify(
            refreshToken,
            config.REFRESH_TOKEN,
            async (err, decoded) => {
                if (err) return res.sendStatus(403); //Forbidden
                // Delete refresh tokens of hacked user
                const hackedUser = await accountModel.findOne({ username: decoded.username }).exec();
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
            }
        )
        return res.sendStatus(403); //Forbidden
    }

    const newRefreshTokenArray = user.refreshToken.filter(rt => rt !== refreshToken);

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        config.REFRESH_TOKEN,
        async (err, decoded) => {
            if (err) {
                console.log(err)
                // expired refresh token
                user.refreshToken = [...newRefreshTokenArray];
                const result = await user.save();
            }
            if (err || user.username !== decoded.username) return res.sendStatus(403);

            // Refresh token was still valid
            // const roles = Object.values(user.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        // "roles": roles
                    }
                },
                config.ACCESS_TOKEN,
                { expiresIn: '20m' }
            );

            const newRefreshToken = jwt.sign(
                { "username": user.username },
                config.REFRESH_TOKEN,
                { expiresIn: '3d' }
            );
            // Saving refreshToken with current user
            user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await user.save();

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            res.json({ accessToken })
        }
    );
}



// const requestResetPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ error: "Missing Credentials" });
//     const user = await userModel.findOne({ email });
//     const admin = await adminModel.findOne({ email });
//     if (!user && !admin)
//       return res.status(404).json({ error: "User not found" });
//     var account;
//     if (user) account = user;
//     if (admin) account = admin;

//     const resetToken = createToken(account._id, "1d");
//     const sanitizedToken = resetToken.replace(/\./g, "-");
//     account.resetToken = sanitizedToken;
//     await account.save();

//     const EmailContent = `
//         <h3>Reset Password</h3>
//         <p>Click <a href="http://localhost:3000/reset-password/${sanitizedToken}"> here</a> to reset your password.</p>`;
//     sendEmail(email, EmailContent, "Password Reset");
//     res.status(200).json({ message: "Password reset email sent" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const resetPassword = async (req, res) => {
//   try {
//     const { resetToken, newPassword } = req.body;
//     if (!resetToken || !newPassword)
//       return res.status(400).json({ error: "Missing Credentials" });
//     const user = await userModel.findOne({ resetToken });
//     if (!user)
//       return res.status(400).json({ error: "Invalid or expired token" });
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.userAccount.password = hashedPassword;
//     user.resetToken = null;
//     await user.save();
//     res.status(200).json({ message: "Password reset successfully" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

module.exports = {
  login,
  logout,
  handleRefreshToken
//   logout,
};
