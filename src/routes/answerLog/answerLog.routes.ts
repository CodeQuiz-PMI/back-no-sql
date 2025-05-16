import { Router } from "express";
import {
  submitAnswerController,
  getAllAnswerLogsController,
  getAnswerLogsByUser,
} from "../../controllers";

const routerLog = Router();

routerLog.post("/", submitAnswerController);
routerLog.get("/", getAllAnswerLogsController);
routerLog.get("/user/:userId", getAnswerLogsByUser);

export default routerLog;
