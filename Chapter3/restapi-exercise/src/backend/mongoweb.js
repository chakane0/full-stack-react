import { createServer } from 'node:http'
import { MongoClient } from 'mongodb'

// define a connection to the DB
const url = 'mongodb://localhost:27017'
const dbName = 'ch2'
const client = new MongoClient(url)

// connect to the DB
try {
    await client.connect()
    console.log("successfully connected to the client")
} catch (err) {
    console.error("Error connecting to the DB: ", err)
}

// create an HTTP server
const server = createServer(async (requestAnimationFrame, res) => {

    // select the db and extract data
    const db = client.db(dbName)
    const users = db.collection('users')
    const usersList = await users.find().toArray()
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(usersList))
})

const host = 'localhost';
const port = 3000;

server.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
});
