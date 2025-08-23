import { Request, Response } from "express";
import { UserService } from "../../services";

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

export const getAllUserController = async (_: Request, res: Response) => {
  try {
    const users = await UserService.findAll();
    res.status(200).json(users);
  } catch (error) {
    handleError(res, error);
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserService.findById(id);
    res.status(200).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserService.update(id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await UserService.deleteById(id);
    res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
};
