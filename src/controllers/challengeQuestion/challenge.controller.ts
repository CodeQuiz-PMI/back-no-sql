import { Request, Response } from "express";
import { ChallengeQuestionService } from "../../services";

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

export const createChallengeController = async (
  req: Request,
  res: Response
) => {
  try {
    const question = await ChallengeQuestionService.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllChallengeController = async (_: Request, res: Response) => {
  try {
    const questions = await ChallengeQuestionService.findAll();
    res.status(200).json(questions);
  } catch (error) {
    handleError(res, error);
  }
};

export const getChallengeByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const question = await ChallengeQuestionService.findById(id);
    res.status(200).json(question);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateChallengeController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const updatedQuestion = await ChallengeQuestionService.update(id, req.body);
    res.status(200).json(updatedQuestion);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteChallengeController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await ChallengeQuestionService.deleteById(id);
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
};
