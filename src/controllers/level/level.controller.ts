import { Request, Response } from "express";
import { Level } from "../../models";

export const createLevelController = async (req: Request, res: Response) => {
  try {
    const level = await Level.create(req.body);
    res.status(201).json(level);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllLevelController = async (_: Request, res: Response) => {
  const levels = await Level.find();
  res.json(levels);
};

export const getLevelByIdController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const level = await Level.findById(req.params.id);
  if (!level) return res.status(404).json({ error: "Nível não encontrado" });
  res.json(level);
};

export const updateLevelController = async (req: Request, res: Response) => {
  const level = await Level.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(level);
};

export const deleteLevelController = async (req: Request, res: Response) => {
  await Level.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
