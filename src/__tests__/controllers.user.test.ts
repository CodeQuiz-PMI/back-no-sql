import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import {
  getAllUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controllers/user/user.controller";
import { User, AnswerLog } from "../models";

jest.mock("../models", () => ({
  User: {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
  AnswerLog: {
    deleteMany: jest.fn(),
  },
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
}));

describe("User Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;
  let next: NextFunction;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    sendMock = jest.fn();
    next = jest.fn();

    req = { params: {}, body: {} };
    res = {
      status: statusMock,
      json: jsonMock,
      send: sendMock,
    };

    jest.spyOn(console, "error").mockImplementation(() => {});

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getAllUserController", () => {
    it("should return all users with status 201", async () => {
      const mockUsers = [{ id: "1" }, { id: "2" }];
      (User.find as jest.Mock).mockResolvedValue(mockUsers);

      await getAllUserController(req as Request, res as Response, next);

      expect(User.find).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockUsers);
    });
  });

  describe("getUserByIdController", () => {
    it("should return user if found", async () => {
      req.params = { id: "1" };
      const mockUser = { id: "1" };
      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      await getUserByIdController(req as Request, res as Response);

      expect(User.findById).toHaveBeenCalledWith("1");
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockUser);
    });

    it("should return 400 if user not found", async () => {
      req.params = { id: "1" };
      (User.findById as jest.Mock).mockResolvedValue(null);

      await getUserByIdController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Usuário não encontrado",
      });
    });
  });

  describe("updateUserController", () => {
    it("should update user with hashed password", async () => {
      req.params = { id: "1" };
      req.body = { password: "123" };
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
      const updatedUser = { id: "1", password: "hashedPassword" };
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUser);

      await updateUserController(req as Request, res as Response);

      expect(bcrypt.hash).toHaveBeenCalledWith("123", 10);
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { password: "hashedPassword" },
        { new: true }
      );
      expect(jsonMock).toHaveBeenCalledWith(updatedUser);
    });

    it("should update user without password", async () => {
      req.params = { id: "1" };
      req.body = { name: "John" };
      const updatedUser = { id: "1", name: "John" };
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUser);

      await updateUserController(req as Request, res as Response);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { name: "John" },
        { new: true }
      );
      expect(jsonMock).toHaveBeenCalledWith(updatedUser);
    });

    it("should return 404 if user not found", async () => {
      req.params = { id: "1" };
      req.body = { name: "John" };
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await updateUserController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Usuário não encontrado.",
      });
    });

    it("should handle errors gracefully", async () => {
      req.params = { id: "1" };
      (User.findByIdAndUpdate as jest.Mock).mockRejectedValue(
        new Error("DB error")
      );

      await updateUserController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Erro ao atualizar usuário.",
      });
    });
  });

  describe("deleteUserController", () => {
    it("should delete user and answer logs", async () => {
      req.params = { id: "1" };
      (User.findByIdAndDelete as jest.Mock).mockResolvedValue({});
      (AnswerLog.deleteMany as jest.Mock).mockResolvedValue({});

      await deleteUserController(req as Request, res as Response);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(AnswerLog.deleteMany).toHaveBeenCalledWith({ user: "1" });
      expect(statusMock).toHaveBeenCalledWith(204);
      expect(sendMock).toHaveBeenCalled();
    });

    it("should handle errors gracefully", async () => {
      req.params = { id: "1" };
      (User.findByIdAndDelete as jest.Mock).mockRejectedValue(
        new Error("DB error")
      );

      await deleteUserController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Erro ao deletar usuário e logs de respostas.",
      });
    });
  });
});
