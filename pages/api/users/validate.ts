import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect";
import { initDB, mongodb } from "../../../lib/mongodb";
import { apiHandler, errorMsgs } from "../../../util/setupApiRoute";
const findUserByEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  let { email } = req.query;
  if (!email) return apiHandler.onError(Object.assign({
    status: 401,
    code: 'unauthorized::bad_input',
    message: 'Email is missing from parameters'
  }), req, res)
  // const users = await mongodb.collections('users').find({}).toArray();
  const users = await mongodb.collection('users').find({}).toArray()
  console.log('users')
  console.log(users)

  return res.json({ users })

}


const handler = nc(apiHandler); // Use handler exported from Utils

handler
  .use(async (req, res, next) => {
    try {
      await initDB()
      next();
    } catch (err) {
      console.error(`err in setting up routes: ${err}`)
      return apiHandler.onError(err, req, res)
    }
  })
  .get((req: NextApiRequest, res: NextApiResponse) => {
    findUserByEmail(req, res)
  })

export default handler;