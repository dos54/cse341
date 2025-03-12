require("dotenv").config()
const {MongoClient, ServerApiVersion} = require("mongodb")
const uri = process.env.DATABASE_URI


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

async function run() {
    try {
        await client.connect()
        await client.db("admin").command({ping: 1})
        console.log("Pinged your deployment. You successfully connected to MongoDB!")
    } finally {
        await client.close()
    }
}

run().catch(console.dir)

async function connectToDatabase() {
    await client.connect()
}

async function query(database_name, collection_name) {
    let data = []
    try {
        await client.connect()
        const db = client.db(database_name)
        const collection = db.collection(collection_name)
        data = await collection.find({}).toArray()
        console.log("Data retrieved:", data)
    } catch (error) {
        console.log("There was a problem fetching the data")
        data = {}
    } finally {
        await client.close()
    }
    return data
}

module.exports = {
    run,
    connectToDatabase,
    query
}