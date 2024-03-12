// Importing the service class
const UserService = require("../Services/userService");
const AuthService = require("../Services/authService");
// creating instances for service class
const user = new UserService();
const authService = new AuthService();

class UserController{
    // User Registration
    static async userRegistration (req,res) {
        try{
            // Validate the user data and add ussr to database
            const newUserAccount = await user.userRegister(req.body);
            return res.status(200).json({newUserAccount});
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

// Export the controller
module.exports = UserController;