// Importing the service class
const AdminService = require("../Services/adminService");
// creating instances for service class
const adminService = new AdminService();

class AdminController{
    // Admin Registration
    static async adminRegistration (req,res) {
        try{
            // Validate the admin data and add admin to database
            
            const newAdminAccount = await adminService.adminRegister(req.body, res);
            return res.status(200).json({newAdminAccount});
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }

    // static async updateUserDetails(req, res) {
    //     try {
    //         const {id} = req.params; // Assuming userId is provided in the request parameters
    //         const updatedDetails = req.body; // Assuming updated user details are sent in the request body

    //         // Call the updateUserDetails method from the UserService
    //         const updatedUser = await user.updateUser(id, updatedDetails);

    //         // Send the updated user details in the response
    //         return res.status(200).json({ updatedUser });
    //     } catch (error) {
    //         res.status(400).json({ error: error.message });
    //     }
    // }
}

// Export the controller
module.exports = AdminController;