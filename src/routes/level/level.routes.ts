import { Router } from "express";
import {
  createLevelController,
  deleteLevelController,
  getAllLevelController,
  getLevelByIdController,
  updateLevelController,
} from "../../controllers";
import { asyncHandler } from "../../controllers/asyncHandler";

const routerLevel = Router();

routerLevel.post("/", asyncHandler(createLevelController));
routerLevel.get("/", asyncHandler(getAllLevelController));
routerLevel.get("/:id", asyncHandler(getLevelByIdController));
routerLevel.put("/:id", asyncHandler(updateLevelController));
routerLevel.delete("/:id", asyncHandler(deleteLevelController));

export default routerLevel;
