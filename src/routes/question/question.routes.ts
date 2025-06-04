import { Router } from "express";
import {
  createQuestionController,
  deleteQuestionController,
  getAllQuestionController,
  getQuestionByIdController,
  updateQuestionController,
} from "../../controllers";
import { asyncHandler } from "../../controllers/asyncHandler";

const routerQuestion = Router();

routerQuestion.post("/", asyncHandler(createQuestionController));
routerQuestion.get("/", asyncHandler(getAllQuestionController));
routerQuestion.get("/:id", asyncHandler(getQuestionByIdController));
routerQuestion.put("/:id", asyncHandler(updateQuestionController));
routerQuestion.delete("/:id", asyncHandler(deleteQuestionController));

// routerQuestion.post("/code", codeQuestionController);

export default routerQuestion;
