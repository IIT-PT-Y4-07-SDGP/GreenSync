const UserService = require("../Services/userService");
const user = new UserService();

class UserController{
    // User Regisstration
    async userRegistration (req,res) {
        try{
            await user.userRegister(req.body);
            return res.status(200).json({message:"User Created Successfully"});
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }
}


module.exports = UserController;