import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect";
import { connectToMongo } from "../../../lib/mongodb";
import { apiHandler } from "../../../util/setupApiRoute";

const handler = nc(apiHandler); // Use handler exported from Utils

handler
  .use(async (req, res, next) => {
    try {
      await connectToMongo()
      next();
    } catch (err) {
      console.error(`err in setting up routes: ${err}`)
      return apiHandler.onError(err, req, res)
    }
  })
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    return res.json({ name: 'John Doe' })
  })

export default handler;