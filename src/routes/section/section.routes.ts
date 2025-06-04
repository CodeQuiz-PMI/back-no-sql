import { Router } from "express";
import {
  createSectionController,
  deleteSectionController,
  getAllSectionController,
  getSectionByIdController,
  updateSectionController,
} from "../../controllers";
import { asyncHandler } from "../../controllers/asyncHandler";

const routerSection = Router();

routerSection.post("/", asyncHandler(createSectionController));
routerSection.get("/", asyncHandler(getAllSectionController));
routerSection.get("/:id", asyncHandler(getSectionByIdController));
routerSection.put("/:id", asyncHandler(updateSectionController));
routerSection.delete("/:id", asyncHandler(deleteSectionController));

export default routerSection;
