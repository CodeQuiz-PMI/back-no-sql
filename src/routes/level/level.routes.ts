import { Router } from "express";
import {
  createLevelController,
  deleteLevelController,
  getAllLevelController,
  getLevelByIdController,
  updateLevelController,
} from "../../controllers";

const routerLevel = Router();

routerLevel.post("/", createLevelController);
routerLevel.get("/", getAllLevelController);
routerLevel.get("/:id", getLevelByIdController);
routerLevel.put("/:id", updateLevelController);
routerLevel.delete("/:id", deleteLevelController);

export default routerLevel;
