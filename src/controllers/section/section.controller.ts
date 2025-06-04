import { Request, Response } from "express";
import { Section } from "../../models";

export const createSectionController = async (req: Request, res: Response) => {
  try {
    const section = await Section.create(req.body);
    res.status(201).json(section);
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "Erro desconhecido." });
    }
  }
};

export const getAllSectionController = async (_: Request, res: Response) => {
  const sections = await Section.find().populate("level");
  res.status(200).json(sections);
};

export const getSectionByIdController = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  const section = await Section.findById(req.params.id).populate("level");
  if (!section) return res.status(404).json({ error: "Seção não encontrada" });
  res.status(200).json(section);
};

export const updateSectionController = async (req: Request, res: Response) => {
  const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(204).json(section);
};

export const deleteSectionController = async (req: Request, res: Response) => {
  await Section.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
