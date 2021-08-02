import { Db, MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DBNAME = process.env.MONGODB_DBNAME
const REALM_FUNC_ID = process.env.REALM_FUNC_ID

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
let client: MongoClient;
if (MONGODB_URI) client = new MongoClient(MONGODB_URI, {
  connectTimeoutMS: 1000 * 60 * 15 //15mins
});
let mongodb: Db;
let realm: Realm.App<Realm.DefaultFunctionsFactory, SimpleObject>;

async function initDB() {
  if (!mongodb) {
    mongodb = await new Promise((resolve, reject) => {
      client.connect((err: any) => {
        if (err) {
          console.error('err at mongodb connection ' + err)
          reject(err)
          return
        }
        const database = client.db(process.env.MONGODB_DBNAME)
        resolve(database);
      })
    }).catch(e => {
      console.log('Could not get connection to MongoDB..\n' + e)
      process.exit(1)
    })
  }
}

async function initRealm() {
  const id = REALM_FUNC_ID;
  const config = {
    id,
  };
  const app = new Realm.App(config);
  realm = app;
  return app;
  // try {
  //   const user = await app.logIn(credentials);
  //   console.log("Successfully logged in!", user.id);
  //   return user;
  // } catch (err) {
  //   console.error("Failed to log in", err.message);
  // }
}

export { initDB, initRealm, mongodb, realm };