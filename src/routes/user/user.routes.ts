import { Router } from "express";
import {
  deleteUserController,
  getAllUserController,
  getUserByIdController,
  updateUserController,
} from "../../controllers";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../controllers/asyncHandler";

const routerUser = Router();

routerUser.get("/", getAllUserController);
routerUser.get("/:id", authMiddleware, asyncHandler(getUserByIdController));
routerUser.patch("/:id", authMiddleware, asyncHandler(updateUserController));
routerUser.delete("/:id", authMiddleware, asyncHandler(deleteUserController));

export default routerUser;
