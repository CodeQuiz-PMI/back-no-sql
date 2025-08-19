import { Request, Response } from "express";
import { ChallengeQuestion } from "../../models";
// import axios from "axios";

export const createChallengeController = async (
  req: Request,
  res: Response
) => {
  try {
    const question = await ChallengeQuestion.create(req.body);
    res.status(201).json(question);
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "Erro desconhecido." });
    }
  }
};

export const getAllChallengeController = async (_: Request, res: Response) => {
  const questions = await ChallengeQuestion.find();
  res.status(200).json(questions);
};

export const getChallengeByIdController = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  const question = await ChallengeQuestion.findById(req.params.id).populate(
    "section"
  );
  if (!question)
    return res.status(404).json({ error: "Questão não encontrada" });
  res.status(200).json(question);
};

export const updateChallengeController = async (
  req: Request,
  res: Response
) => {
  const question = await ChallengeQuestion.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(201).json(question);
};

export const deleteChallengeController = async (
  req: Request,
  res: Response
) => {
  await ChallengeQuestion.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
