const {MongoClient} = require('mongodb');
const config = require('../configuration/config');
const DriverService = require("../Services/driverService");
const uri = config.MONGO_URI;
const client = new MongoClient(uri);
const driverService = new DriverService();

class DriverController {

    static async getDriversList(req, res) {
        try {
            const driversList = await driverService.getDriversList();
            return res.status(200).json(driversList);
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
}

module.exports = DriverController;

