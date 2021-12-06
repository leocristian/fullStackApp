const { MongoClient } = require('mongodb')
const url = "mongodb://localhost:27017/"

const client = new MongoClient(url)

client.connect()

const dbName = "SPEEDIO"
const database = client.db(dbName)

const collection = database.collection("company")

class CompanyController {
   
    async create(req, res) {
        const companyObj = req.body
    
        try {
            const insert = collection.insertOne(companyObj)
            console.log(companyObj.name)
            
            // const create = await companyController.create(companyObj)
            console.log(companyObj.name)
            return insert
            // return res.send({ create })
        } catch (error) {
            console.log(error)
        }
    
       
    }
}

module.exports = CompanyController