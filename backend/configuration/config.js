const path = require("path");

require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Define required environment variables
const requiredVariables = [
    'MONGO_USERNAME', 
    'MONGO_PASSWORD',
    'MONGO_STRING'
];

// Check if all required environment variables are defined
const missingVariables = requiredVariables.filter(variable => !(process.env[variable]));

if (missingVariables.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVariables.join(', ')}`);
}

const config = {
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_STRING: process.env.MONGO_STRING
}

function generateMongoURI() {
    if(config.MONGO_USERNAME && config.MONGO_PASSWORD && config.MONGO_STRING){
        return `mongodb+srv://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_STRING}`;
    } else {
        throw new Error('Error when generating MongoURI');
    }
};

config.MONGO_URI = generateMongoURI();

module.exports = config;
