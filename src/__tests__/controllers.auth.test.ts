import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { register, login } from "../controllers";

jest.mock("../models", () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("Auth Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();

    req = { body: {} };
    res = {
      status: statusMock,
      json: jsonMock,
    };

    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("register", () => {
    it("should register user successfully", async () => {
      req.body = { name: "John", email: "john@example.com", password: "1234" };
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
      const mockUser = {
        _id: "1",
        name: "John",
        email: "john@example.com",
      };
      (User.create as jest.Mock).mockResolvedValue(mockUser);

      await register(req as Request, res as Response);

      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(bcrypt.hash).toHaveBeenCalledWith("1234", 10);
      expect(User.create).toHaveBeenCalledWith({
        name: "John",
        email: "john@example.com",
        password: "hashedPassword",
      });
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        id: "1",
        name: "John",
        email: "john@example.com",
      });
    });

    it("should return 400 if email already exists", async () => {
      req.body = { email: "john@example.com" };
      (User.findOne as jest.Mock).mockResolvedValue({});

      await register(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "E-mail já cadastrado",
      });
    });

    it("should handle error gracefully (instanceof Error)", async () => {
      req.body = { email: "john@example.com" };
      const error = new Error("DB error");
      (User.findOne as jest.Mock).mockRejectedValue(error);

      await register(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "DB error",
      });
    });

    it("should handle error gracefully (not instanceof Error)", async () => {
      req.body = { email: "john@example.com" };
      (User.findOne as jest.Mock).mockRejectedValue("some string error");

      await register(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Erro desconhecido.",
      });
    });

    it("should handle error gracefully (non-Error type from bcrypt.hash)", async () => {
      req.body = { name: "John", email: "john@example.com", password: "1234" };
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockImplementation(() => {
        throw "some string error";
      });

      await register(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Erro desconhecido.",
      });
    });

    it("should handle error thrown by bcrypt.hash", async () => {
      req.body = { name: "John", email: "john@example.com", password: "1234" };
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockImplementation(() => {
        throw new Error("bcrypt failed");
      });

      await register(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "bcrypt failed",
      });
    });

    it("should handle error thrown by bcrypt.hash", async () => {
      req.body = { name: "John", email: "john@example.com", password: "1234" };
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockImplementation(() => {
        throw new Error("bcrypt failed");
      });

      await register(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "bcrypt failed",
      });
    });

    it("should handle error thrown by User.create", async () => {
      req.body = { name: "John", email: "john@example.com", password: "1234" };
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
      (User.create as jest.Mock).mockImplementation(() => {
        throw new Error("create failed");
      });

      await register(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "create failed",
      });
    });

    it("should handle non-Error thrown inside register (User.create)", async () => {
      req.body = { name: "John", email: "john@example.com", password: "1234" };
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
      (User.create as jest.Mock).mockImplementation(() => {
        throw "some string error";
      });

      await register(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Erro desconhecido.",
      });
    });

    it("should not call bcrypt.hash or User.create if user already exists", async () => {
      req.body = { email: "john@example.com" };
      (User.findOne as jest.Mock).mockResolvedValue({});

      await register(req as Request, res as Response);

      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(User.create).not.toHaveBeenCalled();
    });
  });

  describe("login", () => {
    it("should login user successfully", async () => {
      req.body = { email: "john@example.com", password: "1234" };
      const mockUser = {
        _id: "1",
        email: "john@example.com",
        password: "hashedPassword",
        name: "John",
        currentLevel: "Fase 2",
      };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("mockToken");

      await login(req as Request, res as Response);

      expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
      expect(bcrypt.compare).toHaveBeenCalledWith("1234", "hashedPassword");
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: "1", email: "john@example.com" },
        expect.any(String),
        { expiresIn: "24h" }
      );
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        token: "mockToken",
        user: {
          id: "1",
          name: "John",
          email: "john@example.com",
          currentLevel: "Fase 2",
        },
      });
    });

    it("should return 404 if user not found", async () => {
      req.body = { email: "john@example.com", password: "1234" };
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await login(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Usuário não encontrado",
      });
    });

    it("should return 401 if password is incorrect", async () => {
      req.body = { email: "john@example.com", password: "wrongpass" };
      const mockUser = {
        _id: "1",
        email: "john@example.com",
        password: "hashedPassword",
      };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await login(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Senha incorreta",
      });
    });

    it("should handle error gracefully in login (instanceof Error)", async () => {
      req.body = { email: "john@example.com", password: "1234" };
      const error = new Error("DB error");
      (User.findOne as jest.Mock).mockRejectedValue(error);

      await login(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "DB error",
      });
    });

    it("should handle error gracefully in login (not instanceof Error)", async () => {
      req.body = { email: "john@example.com", password: "1234" };
      (User.findOne as jest.Mock).mockRejectedValue("some string error");

      await login(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Erro desconhecido.",
      });
    });

    it("should handle error gracefully in login (non-Error type from jwt.sign)", async () => {
      req.body = { email: "john@example.com", password: "1234" };
      const mockUser = {
        _id: "1",
        email: "john@example.com",
        password: "hashedPassword",
        name: "John",
        currentLevel: "Fase 2",
      };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockImplementation(() => {
        throw "some string error";
      });

      await login(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Erro desconhecido.",
      });
    });

    it("should handle error gracefully in login (non-Error type from bcrypt.compare)", async () => {
      req.body = { email: "john@example.com", password: "1234" };
      const mockUser = {
        _id: "1",
        email: "john@example.com",
        password: "hashedPassword",
      };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockImplementation(() => {
        throw "some string error";
      });

      await login(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Erro desconhecido.",
      });
    });

    it("should handle error gracefully in login (instanceof Error from jwt.sign)", async () => {
      req.body = { email: "john@example.com", password: "1234" };
      const mockUser = {
        _id: "1",
        email: "john@example.com",
        password: "hashedPassword",
        name: "John",
        currentLevel: "Fase 2",
      };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockImplementation(() => {
        throw new Error("JWT error");
      });

      await login(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "JWT error",
      });
    });

    it("should default to 'Fase 1' if currentLevel is not defined", async () => {
      req.body = { email: "john@example.com", password: "1234" };
      const mockUser = {
        _id: "1",
        email: "john@example.com",
        password: "hashedPassword",
        name: "John",
        currentLevel: undefined,
      };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("mockToken");

      await login(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({
        token: "mockToken",
        user: {
          id: "1",
          name: "John",
          email: "john@example.com",
          currentLevel: "Fase 1",
        },
      });
    });
  });
});
