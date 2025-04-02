import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
  getUserByIdController,
  updateUserController,
} from "../../controllers";

const routerUser = Router();

routerUser.post("/", createUserController);
routerUser.get("/", getAllUserController);
routerUser.get("/:id", getUserByIdController);
routerUser.put("/:id", updateUserController);
routerUser.delete("/:id", deleteUserController);

export default routerUser;
