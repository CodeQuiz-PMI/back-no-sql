import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models";

export const register = async (req: Request, res: Response): Promise<any> => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "E-mail já cadastrado" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  res.status(201).json({ id: user._id, name: user.name, email: user.email });
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Senha incorreta" });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || "codequiz_secret",
    {
      expiresIn: "24h",
    }
  );

  res.json({ token });
};
