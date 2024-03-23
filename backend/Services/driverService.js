const {MongoClient} = require('mongodb');
const config = require('../configuration/config');
const uri = config.MONGO_URI;
const client = new MongoClient(uri);

class DriverService {

    async getDriversList() {
        try {
            await client.connect();
            const database = client.db("GreenSync");
            const collection = database.collection("accounts");
            const query = {'userRole': 'DRIVER'};
            const cursor = collection.find(query, {
                projection: {
                    _id: 0,
                    username: 1,
                    email: 1,
                    phoneNumber: 1,
                    accountStatus: 1,
                }
            });
            return await cursor.toArray();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DriverService;
