import { Router } from "express";
import {
  submitAnswerController,
  getAllAnswerLogsController,
  getAnswerLogsByUser,
  deleteAllAnswerLogsByUser,
} from "../../controllers";
import { asyncHandler } from "../../controllers/asyncHandler";

const routerLog = Router();

routerLog.post("/", asyncHandler(submitAnswerController));
routerLog.get("/", asyncHandler(getAllAnswerLogsController));
routerLog.get("/user/:userId", asyncHandler(getAnswerLogsByUser));
routerLog.delete("/user/:userId", asyncHandler(deleteAllAnswerLogsByUser));

export default routerLog;
