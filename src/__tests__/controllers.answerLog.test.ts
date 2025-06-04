import { Request, Response } from "express";
import {
  submitAnswerController,
  getAllAnswerLogsController,
  getAnswerLogsByUser,
  deleteAllAnswerLogsByUser,
} from "../controllers";
import { AnswerLog, Level, Question, User } from "../models";

jest.mock("../models", () => ({
  Question: { findById: jest.fn() },
  Level: { findById: jest.fn() },
  AnswerLog: {
    create: jest.fn(),
    find: jest.fn(),
    deleteMany: jest.fn(),
  },
  User: { findByIdAndUpdate: jest.fn() },
}));

describe("AnswerLog Controllers", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    req = {};
    res = { status: statusMock, json: jsonMock };
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  // ------------------------
  // submitAnswerController
  // ------------------------
  describe("submitAnswerController", () => {
    it("should submit answer successfully", async () => {
      req.body = { userId: "user1", questionId: "q1", userAnswer: "A" };
      (Question.findById as jest.Mock).mockResolvedValue({
        _id: "q1",
        correctResponse: "A",
        points: 10,
        section: { _id: "s1", level: "l1" },
      });
      (Level.findById as jest.Mock).mockResolvedValue({
        _id: "l1",
      });
      (AnswerLog.create as jest.Mock).mockResolvedValue({});
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

      await submitAnswerController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        correct: true,
        pointsEarned: 10,
      });
    });

    it("should handle question not found", async () => {
      req.body = { questionId: "q1", userId: "user1", userAnswer: "A" };
      (Question.findById as jest.Mock).mockResolvedValue(null);

      await submitAnswerController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Questão ou seção não encontrada",
      });
    });

    it("should handle level not found", async () => {
      req.body = { questionId: "q1", userId: "user1", userAnswer: "A" };
      (Question.findById as jest.Mock).mockResolvedValue({
        _id: "q1",
        correctResponse: "A",
        points: 10,
        section: { _id: "s1", level: "l1" },
      });
      (Level.findById as jest.Mock).mockResolvedValue(null);

      await submitAnswerController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Nível não encontrado",
      });
    });

    it("should log error on submitAnswerController failure", async () => {
      req.body = { questionId: "q1", userId: "user1", userAnswer: "A" };
      (Question.findById as jest.Mock).mockRejectedValue(new Error("DB error"));

      await submitAnswerController(req as Request, res as Response);

      expect(console.error).toHaveBeenCalledWith(
        "Erro ao salvar resposta:",
        expect.any(Error)
      );
    });
  });

  // ------------------------
  // getAllAnswerLogsController
  // ------------------------
  describe("getAllAnswerLogsController", () => {
    it("should get all logs successfully", async () => {
      const mockQuery = {
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([{ id: "log1" }]),
      };
      (AnswerLog.find as jest.Mock).mockReturnValue(mockQuery);

      await getAllAnswerLogsController(req as Request, res as Response);

      expect(mockQuery.populate).toHaveBeenCalledTimes(4);
      expect(mockQuery.exec).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith([{ id: "log1" }]);
    });

    it("should handle error in getAllAnswerLogsController", async () => {
      const mockQuery = {
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(new Error("DB error")),
      };
      (AnswerLog.find as jest.Mock).mockReturnValue(mockQuery);

      await getAllAnswerLogsController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Erro ao buscar logs de respostas",
      });
    });
  });

  // ------------------------
  // getAnswerLogsByUser
  // ------------------------
  describe("getAnswerLogsByUser", () => {
    it("should get logs by user", async () => {
      req.params = { userId: "user1" };
      (AnswerLog.find as jest.Mock).mockResolvedValue([{ id: "log1" }]);

      await getAnswerLogsByUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith([{ id: "log1" }]);
    });

    it("should handle error in getAnswerLogsByUser", async () => {
      req.params = { userId: "user1" };
      (AnswerLog.find as jest.Mock).mockRejectedValue(new Error("DB error"));

      await getAnswerLogsByUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Erro ao buscar logs por usuário",
      });
    });
  });

  // ------------------------
  // deleteAllAnswerLogsByUser
  // ------------------------
  describe("deleteAllAnswerLogsByUser", () => {
    it("should delete logs and reset progress", async () => {
      req.params = { userId: "user1" };
      (AnswerLog.deleteMany as jest.Mock).mockResolvedValue({});
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

      await deleteAllAnswerLogsByUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Logs excluídos e progresso resetado com sucesso.",
      });
    });

    it("should handle error in deleteAllAnswerLogsByUser", async () => {
      req.params = { userId: "user1" };
      (AnswerLog.deleteMany as jest.Mock).mockRejectedValue(
        new Error("DB error")
      );

      await deleteAllAnswerLogsByUser(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Erro ao excluir logs e resetar progresso do usuário.",
      });
    });
  });
});
