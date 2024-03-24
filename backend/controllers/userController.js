const UserService = require("../Services/userService");
const user = new UserService();

class UserController{
    static async userRegistration (req,res) {
        try{
            const newUserAccount = await user.userRegister(req.body, res);
            return res.status(200).json(newUserAccount);
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }

    static async updateUserDetails(req, res) {
        try {
            const {id} = req.params; 
            const updatedDetails = req.body; 
            const updatedUser = await user.updateUser(id, updatedDetails);

            return res.status(200).json({ updatedUser });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const {id} = req.params; 
            const deletedUser = await user.deleteUser(id);

            return res.status(200).json({ deletedUser });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = UserController;