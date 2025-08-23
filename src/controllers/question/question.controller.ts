import { Request, Response } from "express";
import { QuestionService } from "../../services";

const handleError = (res: Response, error: unknown) => {
  console.error(error);
  if (error instanceof Error) {
    if (error.message.includes("não encontrada")) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: "Ocorreu um erro interno." });
};

export const createQuestionController = async (req: Request, res: Response) => {
  try {
    const question = await QuestionService.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllQuestionController = async (_: Request, res: Response) => {
  try {
    const questions = await QuestionService.findAll();
    res.status(200).json(questions);
  } catch (error) {
    handleError(res, error);
  }
};

export const getQuestionByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const question = await QuestionService.findById(id);
    res.status(200).json(question);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateQuestionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedQuestion = await QuestionService.update(id, req.body);
    res.status(200).json(updatedQuestion);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteQuestionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await QuestionService.deleteById(id);
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
};
