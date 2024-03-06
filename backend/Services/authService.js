const jwt = require("jsonwebtoken");
const config = require("../configuration/config");

class AuthService {
    generateJWTToken(userName, role)
    {
        return jwt.sign({Username:userName, UserRole:role}, config.ACCESS_TOKEN, {expiresIn: '15s'});
    }

}

module.exports = AuthService;