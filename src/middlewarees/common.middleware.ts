import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";
import { ApiError } from "../api-error";
import { usersByUserIdRepository } from "../repositories/users.by.userId.repository";
import { ObjectSchema } from "joi";


class CommonMiddleware {
  public isIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.userId;
      if (!isObjectIdOrHexString(id)) {
        throw new ApiError("Id not valid", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isExist(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;

      const user = await usersByUserIdRepository.getUserById(userId);
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public isBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();