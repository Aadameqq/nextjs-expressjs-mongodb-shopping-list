import express from "express";
import catchAsyncError from "./catchAsyncError";

import * as controller from "./controller";
import * as errorMiddleware from "./errorMiddleware";

const mainRouter = express.Router();

mainRouter.post("/", catchAsyncError(controller.create));
mainRouter.get("/", catchAsyncError(controller.read));
mainRouter.put("/:id", catchAsyncError(controller.update));
mainRouter.delete("/:id", catchAsyncError(controller.destroy));

mainRouter.use(errorMiddleware.notFound);

export default mainRouter;
