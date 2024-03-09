// Importing the service class
const MCService = require("../services/MCService");
const AuthService = require("../Services/authService");
// creating instances for service class
const mc = new MCService();
const authService = new AuthService();

class MCController{
    // mc Registration
    async MCRegistration (req,res) {
        try{
            // Validate the mc data and add mc to database
            const newMC = await mc.MCRegister(req.body);
            // get JWT token and
            const token = authService.generateJWTToken(newMC.username, newMC.userRole);
            return res.status(200).json({token:token});
        }
        catch(error){
            console.log(error);
            res.status(400).json({error:error.message})
        }
    }
}

// Export the controller
module.exports = MCController;