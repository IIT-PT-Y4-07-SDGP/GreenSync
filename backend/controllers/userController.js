// Importing the service class
const UserService = require("../Services/userService");
// creating instances for service class
const user = new UserService();

class UserController{
    // User Registration
    static async userRegistration (req,res) {
        try{
            // Validate the user data and add ussr to database
            const newUserAccount = await user.userRegister(req.body, res);
            return res.status(200).json({newUserAccount});
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }

    static async updateUserDetails(req, res) {
        try {
            const {id} = req.params; // Assuming userId is provided in the request parameters
            const updatedDetails = req.body; // Assuming updated user details are sent in the request body

            // Call the updateUserDetails method from the UserService
            const updatedUser = await user.updateUser(id, updatedDetails);

            // Send the updated user details in the response
            return res.status(200).json({ updatedUser });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            const {id} = req.params; // Assuming userId is provided in the request parameters

            // Call the updateUserDetails method from the UserService
            const deletedUser = await user.deleteUser(id);

            // Send the updated user details in the response
            return res.status(200).json({ deletedUser });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

// Export the controller
module.exports = UserController;