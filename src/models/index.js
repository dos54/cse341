require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = process.env.DATABASE_URI

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    await client.close()
  }
}

run().catch(console.dir)

async function connectToDatabase() {
  await client.connect()
}

/**
 * Query a MongoDB collection
 * @param {string} database_name
 * @param {string} collection_name
 * @param {object} filter Filter used to search the collection
 * @returns {list} A list of results, or an empty list if there's an error
 */
async function query(database_name, collection_name, filter = {}) {
  let data = []
  try {
    await client.connect()
    const db = client.db(database_name)
    const collection = db.collection(collection_name)
    data = await collection.find(filter).toArray()
    console.log('Data retrieved:', data)
  } catch (error) {
    console.log('There was a problem fetching the data:', error)
    data = []
  } finally {
    await client.close()
  }
  return data
}

async function addData(database_name, collection_name, data) {
  try {
    await client.connect()
    const db = client.db(database_name)
    const collection = db.collection(collection_name)

    const result = await collection.insertOne(data)
    return result.insertedId
  } catch (error) {
    console.log('There was a problem inserting the data:', error)
  } finally {
    await client.close()
  }
}

async function deleteData(database_name, collection_name, filter) {
  try {
    await client.connect()
    const db = client.db(database_name)
    const collection = db.collection(collection_name)

    const result = await collection.deleteOne(filter)
    return result.deletedCount
  } catch (error) {
    console.log('There was a problem deleting the specified data:', error)
  } finally {
    await client.close()
  }
}

module.exports = {
  run,
  connectToDatabase,
  query,
  addData,
  deleteData,
}
