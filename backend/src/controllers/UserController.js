
const { MongoClient, ObjectId } = require('mongodb')
const url = "mongodb://localhost:27017/"

const client = new MongoClient(url)

client.connect()

const dbName = "SPEEDIO"
const database = client.db(dbName)

const collection = database.collection("users")

class UserController {

    async create (newUser) {
        
        try {

            const insert = await collection.insertOne(newUser)

            return insert
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async readOne(newUser) {
        try {
            const user = await collection.findOne({ email: newUser.email, password: newUser.password })
            return user
        } catch (error) {
            return error
        }
    }
    async verify(newUser) {
        try {
            const user = await collection.findOne({ email: newUser.email})
            return user
        } catch (error) {
            return error
        }
    }
    async destroy(userID) {
        try {
            // const colaborator = await collection.findOne({ "_id": ObjectId(colaboratorID) })
            // console.log("encontrou: " + colaborator.name);
            await collection.deleteOne({ "_id": ObjectId(userID) })
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

module.exports = UserController