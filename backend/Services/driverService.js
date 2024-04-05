const mongoose = require('mongoose')
const config = require('../configuration/config');
const {Schema} = require("mongoose");
const eventsModel = require("../models/eventsModel");
const uri = config.MONGO_URI;
const accountsModel = require('../models/accountModel');

class DriverService {

    //used to fetch drivers 
    async getDriversList() {
        try {
            return await accountsModel.find({'userRole': 'DRIVER'}, {
                _id: 0,
                username: 1,
                email: 1,
                phoneNumber: 1,
                accountStatus: 1,
            });
        } catch (error) {
            throw new Error(`Error fetching events from the database: ${error.message}`);
        }
    }
}

module.exports = DriverService;
