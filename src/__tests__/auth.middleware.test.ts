/* eslint-disable @typescript-eslint/no-explicit-any */
import { authMiddleware } from "../middlewares/auth.middleware";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

jest.mock("jsonwebtoken");

describe("authMiddleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("Deve responder com 401 se nenhum token for fornecido", () => {
    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token não fornecido." });
    expect(next).not.toHaveBeenCalled();
  });

  it("Deve chamar next se o token for válido", () => {
    const mockDecoded = { userId: "123" };
    (jwt.verify as jest.Mock).mockReturnValue(mockDecoded);
    req.headers!.authorization = "Bearer valid_token";

    authMiddleware(req as Request, res as Response, next);

    expect(jwt.verify).toHaveBeenCalledWith("valid_token", "codequiz_secret");
    expect((req as any).user).toEqual(mockDecoded);
    expect(next).toHaveBeenCalled();
  });

  it("Deve responder com 401 se o token for inválido", () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Token inválido");
    });
    req.headers!.authorization = "Bearer invalid_token";

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    authMiddleware(req as Request, res as Response, next);

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token inválido." });
    expect(next).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
