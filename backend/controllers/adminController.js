const AdminService = require("../Services/adminService");
const adminService = new AdminService();

class AdminController{
    static async adminRegistration (req,res) {
        try{
            const newAdminAccount = await adminService.adminRegister(req.body, res);
            return res.status(200).json({newAdminAccount});
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }

    static async updateAdminDetails(req, res) {
        try {
            const {id} = req.params; 
            const updatedDetails = req.body; 

        
            const updatedAdmin = await adminService.updateAdmin(id, updatedDetails);

            
            return res.status(200).json({ updatedAdmin });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async approveBusiness(req, res) {
        try {
            const { id, businessType,status } = req.body; 
            const result = await adminService.approveBusiness(id, businessType,status);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async restrictGP(req, res) {
        try {
            const { id, status,duration } = req.body; 

            const result = await adminService.restrictGP(id, status,duration);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async restrictBusiness(req, res) {
        try {
            const { id, status,type } = req.body; 

            const result = await adminService.restrictBusiness(id, type,status);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async districtRegistration (req,res) {
        const {name}=req.body;
        try{
            const district = await adminService.registerDistrict(name);
            return res.status(201).json(district);
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }
}


module.exports = AdminController;