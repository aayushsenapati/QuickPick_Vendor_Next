import { MongoClient } from 'mongodb'
const uri = process.env.MONGODB_URI
let client
let clientPromise
console.log(uri)
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}


if (!process.env.MONGODB_URI) {
    throw new Error('Add Mongo URI to .env.local')
}
client = new MongoClient(uri, options)
clientPromise = client.connect()

export default clientPromise

