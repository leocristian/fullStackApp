class Connection {
    constructor() {
        const { MongoClient } = require('mongodb')
        const url = "mongodb://localhost:27017/"
        
        const client = new MongoClient(url)

        client.connect()

        const dbName = "SPEEDIO"
        const database = client.db(dbName)
    }
    async collection(colName){
        const collection = database.collection(colName)
        
        return collection
    }
}

module.exports = Connection