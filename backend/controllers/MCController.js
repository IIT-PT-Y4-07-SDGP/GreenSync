const MCService = require("../Services/mcService");
// const AuthService = require("../Services/authService");

class MCController{
    static async MCRegistration (req,res) {
        try{
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
            const mcUsers = await MCService.getAllMCUsers();
            return res.status(200).json({ mcUsers });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "Error occurred while fetching MC users" });
        }
    }

    static async getPendingMCUsers(req, res) {
        try {
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

    static async reportGarbage (req,res) {
        try{
            const report = await MCService.reportGarbage(req.body);
            return res.status(200).json({report});
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }

    static async createComplaint (req,res) {
        try{
            const report = await MCService.createComplaint(req.body);
            return res.status(200).json({report});
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }

}


module.exports = MCController;
