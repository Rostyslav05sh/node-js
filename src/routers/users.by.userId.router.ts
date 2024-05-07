import {Router} from "express";

import {userByUserIdController} from "../controllers/users.by.userId.controller";
import {commonMiddleware} from "../middlewarees/common.middleware";
import {UserValidator} from "../validators/user.validator";
import {authMiddleware} from "../middlewarees/auth.middleware";

const router = Router();

router.get("/me", authMiddleware.checkAccesToken, userByUserIdController.getMe);
router.put("/me", authMiddleware.checkAccesToken, commonMiddleware.isBodyValid(UserValidator.update), userByUserIdController.updateMe);
router.delete("/me", authMiddleware.checkAccesToken, userByUserIdController.deleteMe);

export const userByUserIdRouter = router;
