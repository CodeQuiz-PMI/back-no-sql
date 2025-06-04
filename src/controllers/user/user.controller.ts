import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcryptjs";
import { AnswerLog, User } from "../../models";

export const getAllUserController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const user = await User.find();
  res.status(201).json(user);
};

export const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<unknown> => {
  const newUser = req.params.id;
  const user = await User.findById(newUser);
  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });
  res.status(201).json(user);
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updates.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    await AnswerLog.deleteMany({ user: userId });

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar usuário e logs:", error);
    res
      .status(500)
      .json({ error: "Erro ao deletar usuário e logs de respostas." });
  }
};
