// Importing the service class
const MCService = require("../services/MCService");
// const AuthService = require("../Services/authService");

class MCController{
    // mc Registration
    static async MCRegistration (req,res) {
        try{
            // Validate the mc data and add mc to database
            const newMC = await MCService.MCRegister(req.body, res);
            return res.status(200).json({newMC});
        }
        catch(error){
            console.log(error);
            res.status(400).json({error:error.message})
        }
    }
}

// Export the controller
module.exports = MCController;