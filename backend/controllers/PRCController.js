const PRCService = require("../Services/prcService");
const AuthService = require("../Services/authService");

const prc = new PRCService();
const authService = new AuthService();

class PRCController {
    static async PRCRegistration(req, res) {
        try {
            const newPRC = await prc.PRCRegister(req.body, res);
            return res.status(200).json(newPRC);
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

    static async getPRCs(req, res) {
        try {
            const PRCList = await prc.getPrcList();
            return res.status(200).json(PRCList);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
  }



module.exports = PRCController;
