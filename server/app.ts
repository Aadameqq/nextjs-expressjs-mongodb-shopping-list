import express, { Application, Request, Response } from "express";
import { RequestHandler } from "next/dist/server/next-server";

import routes from "./router";
import * as errorMiddleware from "./errorMiddleware";

const createApp = (nextHandle: RequestHandler): Application => {
  const app = express();

  app.use(express.json({ limit: "100kb" }));

  app.use("/api/list/", routes);

  app.use(express.static("public"));

  app.all("*", (req: Request, res: Response) => {
    return nextHandle(req, res);
  });

  app.use(errorMiddleware.notFound);
  app.use(errorMiddleware.catchErrors);

  return app;
};

export default createApp;
