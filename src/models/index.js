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

/**
 * Inserts a document into a specified collection in a MongoDB database.
 * @async
 * @function addData
 * @param {string} database_name - The name of the database.
 * @param {string} collection_name - The name of the collection.
 * @param {Object} data - The document to be inserted.
 * @returns {Promise<ObjectId|null>} The ID of the inserted document, or null if an error occurs.
 */
async function addData(database_name, collection_name, data) {
  try {
    await client.connect()
    const db = client.db(database_name)
    const collection = db.collection(collection_name)

    const result = await collection.insertOne(data)
    return result.insertedId
  } catch (error) {
    console.log('There was a problem inserting the data:', error)
    return null
  } finally {
    await client.close()
  }
}

/**
 * Deletes a document from a specified collection in a MongoDB database.
 * @async
 * @function deleteData
 * @param {string} database_name - The name of the database.
 * @param {string} collection_name - The name of the collection.
 * @param {Object} filter - The filter criteria to find the document to delete.
 * @returns {Promise<number>} The number of documents deleted (0 if none were deleted).
 */
async function deleteData(database_name, collection_name, filter) {
  try {
    await client.connect()
    const db = client.db(database_name)
    const collection = db.collection(collection_name)

    const result = await collection.deleteOne(filter)
    return result.deletedCount
  } catch (error) {
    console.log('There was a problem deleting the specified data:', error)
    return 0
  } finally {
    await client.close()
  }
}

/**
 * Updates a document in a specified collection in a MongoDB database.
 * @async
 * @function updateData
 * @param {string} database_name - The name of the database.
 * @param {string} collection_name - The name of the collection.
 * @param {Object} filter - The filter criteria to find the document to update.
 * @param {Object} data - The new data to be set in the document.
 * @returns {Promise<boolean>} Whether the update operation was acknowledged by the database.
 */
async function updateData(database_name, collection_name, filter, data) {
  try {
    await client.connect()
    const db = client.db(database_name)
    const collection = db.collection(collection_name)

    const result = await collection.updateOne(filter, { $set: data })
    return result.acknowledged
  } catch (error) {
    console.log('There was a problem updating the specified data:', error)
    return false
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
  updateData,
}
