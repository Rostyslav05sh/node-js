import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { usersByUserIdService } from "../services/users.by.userId.service";
import {IJWTPayload} from "../interfaces/jwt-payloade.interface";

class UsersByUserIdController {

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const user = await usersByUserIdService.getById(userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IJWTPayload
      const user = await usersByUserIdService.getMe(jwtPayload.userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as Partial<IUser>;
      const jwtPayload = req.res.locals.jwtPayload as IJWTPayload

      const updatedUser = await usersByUserIdService.updateMe(jwtPayload.userId, dto);

      res.json(updatedUser);
    } catch (e) {
      next(e);
    }
  }

  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = req.res.locals.jwtPayload as IJWTPayload

      await usersByUserIdService.deleteMe(jwtPayload.userId);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userByUserIdController = new UsersByUserIdController();
