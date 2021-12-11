const { MongoClient, ObjectId } = require('mongodb')
const ColaboratorController = require('./ColaboratorController')
const url = "mongodb://localhost:27017/"

const client = new MongoClient(url)

const colaboratorController = new ColaboratorController()

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
    async readOne(companyID) {
        try {
            const company = await collection.findOne({ "_id": ObjectId(companyID) })

            return company
        } catch (error) {
            return error
        }
    }
    async verify(company) {
        try {
            const result = await collection.findOne({ name: company.name})
            return result
        } catch (error) {
            return error
        }
    }
    async update(current, newCompany) {
        await collection.replaceOne(
            { "_id": ObjectId(current)}, newCompany).then(()=> {
            console.log("Empresa atualizada");
        }).catch((error) => {
            console.log(error);
        })
    }
    
    async readAll() {
        try {
            const companies = await collection.find({ }).toArray()

            return companies
        } catch (error) {
            return error
        }
    }
    async destroy(companyID) {
        try {
            const colaborators = await colaboratorController.read(companyID)
            
            if (colaborators.length == 0) {
                console.log("array vazio, deletar empresa");
                await collection.deleteOne({ "_id": ObjectId(companyID) }).then(() => {
                    console.log("Empresa deletada!");
                })
            } else {
                console.log("deletar colaborators antes!");
                await colaboratorController.destroyAll(companyID)
                await collection.deleteOne({ "_id": ObjectId(companyID) }).then(() => {
                    console.log("Empresa deletada!");
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CompanyController