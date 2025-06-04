import { Request, Response } from "express";
import { Level } from "../../models";

export const createLevelController = async (req: Request, res: Response) => {
  try {
    const level = await Level.create(req.body);
    res.status(201).json(level);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "Erro desconhecido." });
    }
  }
};

export const getAllLevelController = async (_: Request, res: Response) => {
  const levels = await Level.find();
  res.status(200).json(levels);
};

export const getLevelByIdController = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  const level = await Level.findById(req.params.id);
  if (!level) return res.status(404).json({ error: "Nível não encontrado" });
  res.status(200).json(level);
};

export const updateLevelController = async (req: Request, res: Response) => {
  const level = await Level.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(201).json(level);
};

export const deleteLevelController = async (req: Request, res: Response) => {
  await Level.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
