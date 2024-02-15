const path = require("path");

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const config = {
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_STRING: process.env.MONGO_STRING,
    PORT: process.env.PORT
}

module.exports = config;



