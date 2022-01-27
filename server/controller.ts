import { Request, Response } from "express";
import ApiError from "./ApiError";
import ListElement from "./model";
import StatusCode from "./StatusCodeEnum";
import { ObjectId } from "mongodb";

export const create = async (req: Request, res: Response) => {
  const { content } = req.body;

  if (!content) throw new ApiError(StatusCode.BAD_REQUEST);

  const createdElement = await new ListElement({ content }).save();

  return res.status(StatusCode.OK).json(createdElement);
};

export const read = async (req: Request, res: Response) => {
  const elements = await ListElement.find({});
  return res.status(StatusCode.OK).json(elements);
};
export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content, isMarked } = req.body;

  if (!id || !content) throw new ApiError(StatusCode.BAD_REQUEST);

  await ListElement.findOneAndUpdate(
    { _id: ObjectId(id) },
    { content, ...(isMarked === undefined ? {} : { isMarked }) }
  );

  const updatedElement = await ListElement.findOne({ _id: ObjectId(id) });

  return res.status(StatusCode.OK).json(updatedElement);
};

export const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedElement = await ListElement.findOneAndDelete({
    _id: ObjectId(id),
  });

  res.status(StatusCode.OK).json(deletedElement);
};
