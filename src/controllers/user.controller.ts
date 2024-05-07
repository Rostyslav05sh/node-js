import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getList();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as Partial<IUser>;

      const newUser: IUser = await userService.create(dto);
      res.status(201).json(newUser);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
