import { Request, Response } from "express";
import { AuthService } from "../../services";

const handleAuthError = (res: Response, error: unknown) => {
  console.error(error);

  if (error instanceof Error) {
    switch (error.message) {
      case "E-mail já cadastrado":
        return res.status(400).json({ message: error.message });
      case "Usuário não encontrado":
        return res.status(404).json({ message: error.message });
      case "Senha incorreta":
        return res.status(401).json({ message: error.message });
      default:
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
  }

  return res.status(500).json({ error: "Ocorreu um erro desconhecido." });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const newUser = await AuthService.register({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    handleAuthError(res, error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login({ email, password });
    res.status(200).json(result);
  } catch (error) {
    handleAuthError(res, error);
  }
};
