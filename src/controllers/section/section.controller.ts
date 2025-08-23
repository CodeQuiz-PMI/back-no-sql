import { Request, Response } from "express";
import { SectionService } from "../../services";

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

export const createSectionController = async (req: Request, res: Response) => {
  try {
    const section = await SectionService.create(req.body);
    res.status(201).json(section);
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllSectionController = async (_: Request, res: Response) => {
  try {
    const sections = await SectionService.findAll();
    res.status(200).json(sections);
  } catch (error) {
    handleError(res, error);
  }
};

export const getSectionByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const section = await SectionService.findById(id);
    res.status(200).json(section);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateSectionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedSection = await SectionService.update(id, req.body);
    res.status(200).json(updatedSection);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteSectionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await SectionService.deleteById(id);
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
};
