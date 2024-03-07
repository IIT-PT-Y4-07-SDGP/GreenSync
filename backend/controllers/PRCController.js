// Importing the service class
const PRCService = require("../Services/PRCService");
const AuthService = require("../Services/authService");
// creating instances for service class
const prc = new PRCService();
const authService = new AuthService();

class PRCController{
    // prc Registration
    async PRCRegistration (req,res) {
        try{
            // Validate the prc data and add prc to database
            const newPRC = await prc.PRCRegister(req.body);
            // get JWT token and
            const token = authService.generateJWTToken(newPRC.username, newPRC.userRole);
            return res.status(200).json({token:token});
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }
}

// Export the controller
module.exports = PRCController;