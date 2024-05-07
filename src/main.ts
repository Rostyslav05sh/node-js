import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { ApiError } from "./api-error";
import { userRouter } from "./routers/user.router";
import { userByUserIdRouter } from "./routers/users.by.userId.router";
import { config } from "./configs/config";
import {authRouter} from "./routers/auth.router";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/users", userByUserIdRouter);
app.use("/auth", authRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.status || 500).json(err.message);
  }
);

process.on("uncaughtException", (error) => {
  console.error("uncaughtException: ", error);
  process.exit(1);
});

app.listen(config.Port, config.Host, async () => {
  await mongoose.connect(config.Mongo_URL);
  console.log(`Server is running at http://${config.Host}:${config.Port}/`);
});