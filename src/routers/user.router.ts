import {Router} from "express";

import {userController} from "../controllers/user.controller";
import {commonMiddleware} from "../middlewarees/common.middleware";
import {UserValidator} from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);
router.post("/", commonMiddleware.isBodyValid(UserValidator.create), userController.create);

export const userRouter = router;
