const {MongoClient} = require('mongodb');
const config = require('../configuration/config');
const uri = config.MONGO_URI;
const client = new MongoClient(uri);

class DriverService {
    async getPRCs() {
        try {
            const database = client.db("GreenSync");
            const collection = database.collection("prc-accounts");
            const cursor = collection.find({}, {projection: {_id: 0,
                    PRCName: 1,
                    PRCBusinessRegNumber: 2,
                    District: 3,
                    PRCStatus: 4,
                    Address: 5,
                    }});
            return await cursor.toArray();
        } finally {
            await client.close();
        }
    }
}

module.exports = DriverService;
