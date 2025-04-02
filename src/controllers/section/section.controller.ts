import { Request, Response } from "express";
import { Section } from "../../models";

export const createSectionController = async (req: Request, res: Response) => {
  try {
    const section = await Section.create(req.body);
    res.status(201).json(section);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllSectionController = async (_: Request, res: Response) => {
  const sections = await Section.find().populate("level");
  res.json(sections);
};

export const getSectionByIdController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const section = await Section.findById(req.params.id).populate("level");
  if (!section) return res.status(404).json({ error: "Seção não encontrada" });
  res.json(section);
};

export const updateSectionController = async (req: Request, res: Response) => {
  const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(section);
};

export const deleteSectionController = async (req: Request, res: Response) => {
  await Section.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
