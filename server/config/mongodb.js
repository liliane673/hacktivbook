require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.URI_MONGODB;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


const database = client.db("social-media-db");

module.exports = { database }
