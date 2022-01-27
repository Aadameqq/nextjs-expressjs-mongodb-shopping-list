import { NextFunction, Request, RequestHandler, Response } from "express";
import { NODE_ENV } from "./config.json";

const catchAsync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      if (NODE_ENV === "development") console.log(err);
      next(err);
    }
  };
export default catchAsync;
