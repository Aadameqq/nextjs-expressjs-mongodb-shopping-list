import { NextFunction, Request, Response } from "express";
import ApiError from "./ApiError";
import StatusCode from "./StatusCodeEnum";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(StatusCode.NOT_FOUND));
};

export const catchErrors = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.sendStatus(err.statusCode);
  }
  return res.sendStatus(StatusCode.INTERNAL_SERVER_ERROR);
};
