import { NextApiRequest, NextApiResponse } from "next";

export interface ErrorResponse {
  status: number,
  code: string,
  message: string
}

export const errorMsgs = {
  UNAUTHORIZED: {
    status: 401,
    code: "unauthorized",
    message: "You need to login first"
  },
  FORBIDDEN: {
    status: 403,
    code: "forbidden",
    message: "You have no permission to access this route"
  },
  NOT_FOUND: {
    status: 404,
    code: "resource_not_found",
    message: "Cannot find corresponding resources"
  },
  RESOURCE_EXISTS: {
    status: 409,
    code: "resource_already_exists",
    message: "Corressponding Resource already exists, failed to create or update"
  }
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