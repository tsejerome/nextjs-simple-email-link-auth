import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect";
import { initDB, mongodb } from "../../lib/mongodb";
import { apiHandler, errorMsgs } from "../../util/setupApiRoute";
import { UserMongo } from "../../types/mongodb/user";
import { v4 as uuid } from 'uuid';
import { sendEmailMagicLink } from "../../lib/sendgrid";

const generateSecrete = () => { return uuid() }


const findUserByEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  let { email } = req.query;
  if (!email) return apiHandler.onError(Object.assign({
    status: 401,
    code: 'unauthorized::bad_input',
    message: 'Email is missing from parameters'
  }), req, res)

  const [user]: UserMongo[] = await mongodb.collection('users').find({ email }).toArray()
  if (!user) return apiHandler.onError(errorMsgs.NOT_FOUND, req, res)

  const secrete = generateSecrete()
  await mongodb.collection('users').updateOne({ email }, {
    $set: {
      secrete,
      last_updated: new Date()
    }
  });

  await sendEmailMagicLink(email, secrete);

  return res.json({ success: true })

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