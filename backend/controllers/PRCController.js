// Importing the service class
const PRCService = require("../Services/prcService");
const AuthService = require("../Services/authService");
// creating instances for service class
const prc = new PRCService();
const authService = new AuthService();

class PRCController{
    // prc Registration
    static async PRCRegistration (req,res) {
        try{
            // Validate the prc data and add prc to database
            const newPRC = await prc.PRCRegister(req.body, res);
            return res.status(200).json(newPRC);
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    }

    static async getPRCByUsername(req, res) {
        try {
            const {username} = req.params; 

            const PRC = await prc.getPRCByUsername(username);
            return res.status(200).json(PRC);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

// Export the controller
module.exports = PRCController;
