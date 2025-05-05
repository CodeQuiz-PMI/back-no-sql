import { Router } from "express";
import {
  deleteUserController,
  getAllUserController,
  getUserByIdController,
  updateUserController,
} from "../../controllers";

import { authMiddleware } from "../../middlewares/auth.middleware";

const routerUser = Router();

routerUser.get("/", authMiddleware, getAllUserController);
routerUser.get("/:id", authMiddleware, getUserByIdController);
routerUser.put("/:id", authMiddleware, updateUserController);
routerUser.delete("/:id", authMiddleware, deleteUserController);

export default routerUser;
