import { Router } from "express";
import {
  createSectionController,
  deleteSectionController,
  getAllSectionController,
  getSectionByIdController,
  updateSectionController,
} from "../../controllers";

const routerSection = Router();

routerSection.post("/", createSectionController);
routerSection.get("/", getAllSectionController);
routerSection.get("/:id", getSectionByIdController);
routerSection.put("/:id", updateSectionController);
routerSection.delete("/:id", deleteSectionController);

export default routerSection;
