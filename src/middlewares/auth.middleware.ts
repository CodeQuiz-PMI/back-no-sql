import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token não fornecido." });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || "codequiz_secret";
    const decoded = jwt.verify(token, secret);
    (req as AuthenticatedRequest).user = decoded;
    next();
  } catch (err: unknown) {
    console.error(err);
    res.status(401).json({ message: "Token inválido." });
  }
};
