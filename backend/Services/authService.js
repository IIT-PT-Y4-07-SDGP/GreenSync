const jwt = require("jsonwebtoken");
const config = require("../configuration/config");

class AuthService {
    createToken(payload, expiry){
        return jwt.sign({ payload }, config.ACCESS_TOKEN, { 
            expiresIn: expiry,
        });
    }
}

module.exports = AuthService;