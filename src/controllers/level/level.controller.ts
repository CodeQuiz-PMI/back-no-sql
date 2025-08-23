import { Request, Response } from "express";
import { LevelService } from "../../services";

const handleError = (res: Response, error: unknown) => {
  console.error(error);
  if (error instanceof Error) {
    if (error.message.includes("não encontrado")) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: "Ocorreu um erro interno." });
};

export const createLevelController = async (req: Request, res: Response) => {
  try {
    const level = await LevelService.create(req.body);
    res.status(201).json(level);
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllLevelController = async (_: Request, res: Response) => {
  try {
    const levels = await LevelService.findAll();
    res.status(200).json(levels);
  } catch (error) {
    handleError(res, error);
  }
};

export const getLevelByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const level = await LevelService.findById(id);
    res.status(200).json(level);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateLevelController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedLevel = await LevelService.update(id, req.body);
    res.status(200).json(updatedLevel);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteLevelController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await LevelService.deleteById(id);
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
};
