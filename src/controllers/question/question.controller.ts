import { Request, Response } from "express";
import { Question } from "../../models";

export const createQuestionController = async (req: Request, res: Response) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllQuestionController = async (_: Request, res: Response) => {
  const questions = await Question.find().populate("section");
  res.json(questions);
};

export const getQuestionByIdController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const question = await Question.findById(req.params.id).populate("section");
  if (!question)
    return res.status(404).json({ error: "Questão não encontrada" });
  res.json(question);
};

export const updateQuestionController = async (req: Request, res: Response) => {
  const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(question);
};

export const deleteQuestionController = async (req: Request, res: Response) => {
  await Question.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
