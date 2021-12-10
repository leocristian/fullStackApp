
const { MongoClient, ObjectId } = require('mongodb')
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
            const colaborators = await collection.find({ companyID: companyID }).toArray()

            return colaborators
        } catch (error) {
            return error
        }
    }
    async update(current, newColaborator) {
        await collection.replaceOne(
            { "_id": ObjectId(current)}, newColaborator).then(()=> {
            console.log("Colaborador atualizado");
        }).catch((error) => {
            console.log(error);
        })
    }
    async readOne(colaboratorID) {
        try {
            const colaborator = await collection.findOne({ "_id": ObjectId(colaboratorID) })
            return colaborator
        } catch (error) {
            return error
        }
    }
    async destroy(colaboratorID) {
        try {
            // const colaborator = await collection.findOne({ "_id": ObjectId(colaboratorID) })
            // console.log("encontrou: " + colaborator.name);
            await collection.deleteOne({ "_id": ObjectId(colaboratorID) })
        } catch (error) {
            console.log(error)
        }
    }
    async destroyAll(companyID) {
        try {
            await collection.deleteMany({ companyID: companyID}).then(() => {
                console.log("colaboradores deletados!");
            })
        }catch(error) {
            console.log(error);
        }
    }
}

module.exports = ColaboratorController