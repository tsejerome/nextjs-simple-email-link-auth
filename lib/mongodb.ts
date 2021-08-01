import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DBNAME = process.env.MONGODB_DBNAME

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!MONGODB_DBNAME) {
  throw new Error(
    'Please define the MONGODB_DBNAME environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToMongo() {
  console.log('cached')
  console.log(cached)
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    console.log('.....')
    cached.promise = MongoClient.connect(MONGODB_URI).then((client) => {
      console.log('.....2')
      return {
        client,
        db: client.db(MONGODB_DBNAME),
      }
    }).catch((err) => {
      console.error("Error ion setup mongodb")
      console.error(err)
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}