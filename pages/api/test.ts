import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect";
import { initDB, initRealm, mongodb, realm } from "../../lib/mongodb";
import { apiHandler, errorMsgs } from "../../util/setupApiRoute";
import { UserMongo } from "../../types/mongodb/user";
import { v4 as uuid } from 'uuid';
import { sendEmailMagicLink } from "../../lib/sendgrid";
import Realm, { User } from "realm";
import { ObjectId } from "mongodb";

const test = async (req: NextApiRequest, res: NextApiResponse) => {
  let user: User;

  try {
    let { testing } = req.query;
    if (!testing) return apiHandler.onError(Object.assign({
      status: 401,
      code: 'unauthorized::bad_input',
      message: 'testing is missing from parameters'
    }), req, res)

    return res.json({ success: true });

  } catch (err) {
    console.error(err)
    console.error("Failed to log in", err.message);
    return apiHandler.onError(errorMsgs.UNAUTHORIZED, req, res)
  }
}


const handler = nc(apiHandler); // Use handler exported from Utils

handler
  .use(async (req, res, next) => {
    try {
      next();
    } catch (err) {
      console.error(`err in setting up routes: ${err}`)
      return apiHandler.onError(err, req, res)
    }
  })
  .get((req: NextApiRequest, res: NextApiResponse) => {
    console.log('getttt')
    test(req, res)
  })

export default handler;