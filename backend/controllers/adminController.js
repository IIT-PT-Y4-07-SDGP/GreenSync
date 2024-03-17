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

    static async updateAdminDetails(req, res) {
        try {
            const {id} = req.params; // Assuming adminId is provided in the request parameters
            const updatedDetails = req.body; // Assuming updated admin details are sent in the request body

            // Call the updateAdminDetails method from the UserService
            const updatedAdmin = await adminService.updateAdmin(id, updatedDetails);

            // Send the updated user details in the response
            return res.status(200).json({ updatedAdmin });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async approveBusiness(req, res) {
        try {
            const { id, businessType,status } = req.body; // Assuming businessId and businessType are provided in the request parameter

            // Call the approveBusiness method from the AdminService
            const result = await adminService.approveBusiness(id, businessType,status);

            // Send the result in the response
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async restrictGP(req, res) {
        try {
            const { id, status,duration } = req.body; 

            const result = await adminService.restrictGP(id, status,duration);

            // Send the result in the response
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async restrictBusiness(req, res) {
        try {
            const { id, status,type } = req.body; 

            const result = await adminService.restrictBusiness(id, type,status);

            // Send the result in the response
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

// Export the controller
module.exports = AdminController;