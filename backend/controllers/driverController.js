const {MongoClient} = require('mongodb');
const config = require('../configuration/config');
const DriverService = require("../Services/driverService");
const uri = config.MONGO_URI;
const client = new MongoClient(uri);
const driverService = new DriverService();

class DriverController {

    static async getPRCs(req, res) {
        try {
            const PRCList = await driverService.getPRCs();
            return res.status(200).json({PRCList});
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    }

}

module.exports = DriverController;

