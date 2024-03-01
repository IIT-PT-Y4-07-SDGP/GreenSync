const jwt = require("jsonwebtoken");
const config = require("../configuration/config");

class AuthService {
    generateJWTToken(userName, userID, role)
    {
        return jwt.sign({Username:userName, UserID: userID, UserRole:role}, config.ACCESS_TOKEN, {expiresIn: '15s'});
    }

}

module.exports = AuthService;