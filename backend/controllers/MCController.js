// Importing the service class
const MCService = require("../Services/mcService");
// const AuthService = require("../Services/authService");

class MCController{
    // mc Registration
    static async MCRegistration (req,res) {
        try{
            // Validate the mc data and add mc to database
            const newMC = await MCService.MCRegister(req.body, res);
            return res.status(200).json(newMC);
        }
        catch(error){
            console.log(error);
            res.status(400).json({error:error.message})
        }
    }

    static async getAllMCUsers(req, res) {
        try {
            // Fetch all MC users from the database
            const mcUsers = await MCService.getAllMCUsers();
            return res.status(200).json({ mcUsers });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "Error occurred while fetching MC users" });
        }
    }

    static async getPendingMCUsers(req, res) {
        try {
            // Fetch all MC users from the database
            const mcUsers = await MCService.getPendingMCUsers();
            return res.status(200).json({ mcUsers });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "Error occurred while fetching Pending MC users" });
        }
    }

    static async addPickupPoint (req,res) {
        const {name,mc}=req.body
        try{
            const newPickup = await MCService.addPickupPoint(name,mc);
            return res.status(200).json(newPickup);
        }
        catch(error){
            console.log(error);
            res.status(400).json({error:error.message})
        }
    }

    static async getPickupPoints(req, res) {
        const {id}=req.params;
        try {
            // Fetch all MC users from the database
            const pickupPoints = await MCService.getPickupPoints(id);
            return res.status(200).json(pickupPoints);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }

    static async createSchedule (req,res) {
        try{
            const schedule = await MCService.createSchedule(req.body);
            return res.status(200).json(schedule);
        }
        catch(error){
            console.log(error);
            res.status(400).json({error:error.message})
        }
    }

    static async updateSchedule (req,res) {
        const {scheduleId,updatedSchedule}=req.body;
        try{
            const schedule = await MCService.updateSchedule(scheduleId,updatedSchedule);
            return res.status(200).json(schedule);
        }
        catch(error){
            console.log(error);
            res.status(400).json({error:error.message})
        }
    }

    static async getMCByUsername(req, res) {
        try {
            const {username} = req.params; 

            const MC = await MCService.getMCByUsername(username);
            return res.status(200).json(MC);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

// Export the controller
module.exports = MCController;
