import { NextApiRequest, NextApiResponse } from "next";

export interface ErrorResponse {
  status: number,
  code: string,
  message: string
}

export const apiHandler = {
  attachParams: true,
  onError: (
    err: ErrorResponse = { status: 500, code: 'unknown_error', message: 'Internal Server Error' },
    req: NextApiRequest,
    res: NextApiResponse
  ) => {
    if (err === null) err = { status: 500, code: 'unknown_error', message: 'Internal Server Error' }
    if (!err.status) err.status = 500;
    res.status(err.status).json(err);
    return;
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(405).json({
      status: 405,
      code: 'request_error::route_not_found',
      message: 'Bad Request: Route Not Found'
    });
  },
};