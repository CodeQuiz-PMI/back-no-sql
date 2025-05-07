import { Router } from "express";
import {
  codeQuestionController,
  createQuestionController,
  deleteQuestionController,
  getAllQuestionController,
  getQuestionByIdController,
  updateQuestionController,
} from "../../controllers";

const routerQuestion = Router();

routerQuestion.post("/", createQuestionController);
routerQuestion.get("/", getAllQuestionController);
routerQuestion.get("/:id", getQuestionByIdController);
routerQuestion.put("/:id", updateQuestionController);
routerQuestion.delete("/:id", deleteQuestionController);

routerQuestion.post("/code", codeQuestionController);

export default routerQuestion;
