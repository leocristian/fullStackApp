const { MongoClient } = require('mongodb')
const url = "mongodb://localhost:27017/"

const client = new MongoClient(url)

client.connect()

const dbName = "SPEEDIO"
const database = client.db(dbName)

const collection = database.collection("company")

class CompanyController {
   
    async create(newCompany) {
        try {
            const insert = await collection.insertOne(newCompany)
            return insert
            // return res.send({ create })
        } catch (error) {
            return false
        }
    
       
    }

    async readAll() {
        try {
            const companies = await collection.find({ }).toArray()

            return companies
        } catch (error) {
            return error
        }
    }
}

module.exports = CompanyController