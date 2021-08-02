import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect";
import { initDB, initRealm, mongodb, realm } from "../../lib/mongodb";
import { apiHandler, errorMsgs } from "../../util/setupApiRoute";
import { UserMongo } from "../../types/mongodb/user";
import { v4 as uuid } from 'uuid';
import { sendEmailMagicLink } from "../../lib/sendgrid";
import Realm, { User } from "realm";
import { ObjectId } from "mongodb";

const generateSecrete = () => { return uuid() }


const verifyMagicLink = async (req: NextApiRequest, res: NextApiResponse) => {
  let user: User;

  try {
    let { email, s } = req.query;
    if (!email || !s) return apiHandler.onError(Object.assign({
      status: 401,
      code: 'unauthorized::bad_input',
      message: 'Email is missing from parameters'
    }), req, res)

    const secrete = s;
    console.log({ email, secrete })
    const credentials = Realm.Credentials.function({ email, secrete });
    user = await realm.logIn(credentials);
    if (!user) {
      return apiHandler.onError(null, req, res)
    }

    return res.json({ success: true });

  } catch (err) {
    console.error(err)
    console.error("Failed to log in", err.message);
    return apiHandler.onError(errorMsgs.UNAUTHORIZED, req, res)
  } finally {
    if (user) user.logOut();
  }

}


const handler = nc(apiHandler); // Use handler exported from Utils

handler
  .use(async (req, res, next) => {
    try {
      await initDB()
      await initRealm()
      next();
    } catch (err) {
      console.error(`err in setting up routes: ${err}`)
      return apiHandler.onError(err, req, res)
    }
  })
  .get((req: NextApiRequest, res: NextApiResponse) => {
    verifyMagicLink(req, res)
  })

export default handler;