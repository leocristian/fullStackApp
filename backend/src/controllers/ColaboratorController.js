
const { MongoClient } = require('mongodb')
const url = "mongodb://localhost:27017/"

const client = new MongoClient(url)

client.connect()

const dbName = "SPEEDIO"
const database = client.db(dbName)

const collection = database.collection("colaborators")

class ColaboratorController {

    async create (newColaborator) {
        
        try {
            const insert = await collection.insertOne(newColaborator)

            return insert
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async read(companyID) {
        try {
            const colaborators = await collection.find({ }).toArray()

            return colaborators
        } catch (error) {
            return error
        }
    }
}

module.exports = ColaboratorController