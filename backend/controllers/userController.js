// Importing the service class
const UserService = require("../Services/userService");
const AuthService = require("../Services/authService");
// creating instances for service class
const user = new UserService();
const authService = new AuthService();

class UserController{
    // User Registration
    async userRegistration (req,res) {
        try{
            console.log(req.body);
            // Validate the user data and add ussr to database
            const newUser = await user.userRegister(req.body);
            // get JWT token and
            const token = authService.generateJWTToken(newUser.account.username, newUser.id, newUser.userRole);
            return res.status(200).json({token:token});
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

// Export the controller
module.exports = UserController;