/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import {
  submitAnswerController,
  getAllAnswerLogsController,
  getAnswerLogsByUser,
  deleteAllAnswerLogsByUser,
} from "../controllers";
import { Question, Section, Level, AnswerLog, User } from "../models";
import { Types } from "mongoose";

const mockRequest = (body = {}, params = {}) =>
  ({ body, params } as unknown as Request);

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Answer Controllers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("submitAnswerController", () => {
    it("should return 404 if question not found", async () => {
      jest.spyOn(Question, "findById").mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const req = mockRequest({
        userId: new Types.ObjectId(),
        questionId: new Types.ObjectId(),
        userAnswer: "A",
      });

      const res = mockResponse();

      await submitAnswerController(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Questão não encontrada",
      });
    });

    it("should return 404 if section not found", async () => {
      const questionId = new Types.ObjectId();
      const sectionId = new Types.ObjectId();

      const questionMock = {
        _id: questionId.toString(),
        correctResponse: "A",
        points: 10,
        section: sectionId.toString(),
      };

      jest.spyOn(Question, "findById").mockReturnValue({
        exec: jest.fn().mockResolvedValue(questionMock),
      } as any);

      jest.spyOn(Section, "findById").mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const req = mockRequest({
        userId: new Types.ObjectId(),
        questionId: questionId.toString(),
        userAnswer: "A",
      });

      const res = mockResponse();

      await submitAnswerController(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Seção não encontrada",
      });
    });

    it("should return 404 if level not found", async () => {
      const questionId = new Types.ObjectId();
      const sectionId = new Types.ObjectId();
      const levelId = new Types.ObjectId();

      const questionMock = {
        _id: questionId,
        correctResponse: "A",
        points: 10,
        section: sectionId,
      };

      const sectionMock = {
        _id: sectionId,
        level: levelId,
      };

      jest.spyOn(Question, "findById").mockReturnValue({
        exec: jest.fn().mockResolvedValue(questionMock),
      } as any);

      jest.spyOn(Section, "findById").mockReturnValue({
        exec: jest.fn().mockResolvedValue(sectionMock),
      } as any);

      jest.spyOn(Level, "findById").mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const req = mockRequest({
        userId: new Types.ObjectId(),
        questionId: questionId,
        userAnswer: "A",
      });

      const res = mockResponse();

      await submitAnswerController(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Nível não encontrado",
      });
    });

    it("should save answer log and update user points when answer is correct", async () => {
      const questionId = new Types.ObjectId();
      const sectionId = new Types.ObjectId();
      const levelId = new Types.ObjectId();

      const questionMock = {
        _id: questionId,
        correctResponse: "A",
        points: 10,
        section: sectionId,
      };

      const sectionMock = {
        _id: sectionId,
        level: levelId,
      };

      const levelMock = {
        _id: levelId,
      };

      jest.spyOn(Question, "findById").mockReturnValue({
        exec: jest.fn().mockResolvedValue(questionMock),
      } as any);

      jest.spyOn(Section, "findById").mockReturnValue({
        exec: jest.fn().mockResolvedValue(sectionMock),
      } as any);

      jest.spyOn(Level, "findById").mockReturnValue({
        exec: jest.fn().mockResolvedValue(levelMock),
      } as any);

      jest.spyOn(AnswerLog, "create").mockResolvedValue({
        _id: new Types.ObjectId(),
        user: new Types.ObjectId(),
        question: new Types.ObjectId(),
        section: new Types.ObjectId(),
        level: new Types.ObjectId(),
        userAnswer: "A",
        isCorrect: true,
        pointsEarned: 10,
        __v: 0,
      } as any);

      jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue({});

      const req = mockRequest({
        userId: new Types.ObjectId(),
        questionId: questionId,
        userAnswer: "A",
      });
      const res = mockResponse();

      await submitAnswerController(req, res);

      expect(AnswerLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          user: req.body.userId,
          question: questionId,
          section: sectionId,
          level: levelId,
          userAnswer: "A",
          isCorrect: true,
          pointsEarned: 10,
        })
      );

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        req.body.userId,
        { $inc: { totalPoints: 10 } },
        { new: true }
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        correct: true,
        pointsEarned: 10,
      });
    });

    it("should handle incorrect answer with zero points", async () => {
      const questionId = new Types.ObjectId();
      const sectionId = new Types.ObjectId();
      const levelId = new Types.ObjectId();

      const questionMock = {
        _id: questionId,
        correctResponse: "A",
        points: 10,
        section: sectionId,
      };

      const sectionMock = {
        _id: sectionId,
        level: levelId,
      };

      const levelMock = {
        _id: levelId,
      };

      jest.spyOn(Question, "findById").mockReturnValue({
        exec: jest.fn().mockResolvedValue(questionMock),
      } as any);

      jest.spyOn(Section, "findById").mockReturnValue({
        exec: jest.fn().mockResolvedValue(sectionMock),
      } as any);

      jest.spyOn(Level, "findById").mockReturnValue({
        exec: jest.fn().mockResolvedValue(levelMock),
      } as any);

      jest.spyOn(AnswerLog, "create").mockResolvedValue({
        _id: new Types.ObjectId(),
        user: new Types.ObjectId(),
        question: new Types.ObjectId(),
        section: new Types.ObjectId(),
        level: new Types.ObjectId(),
        userAnswer: "A",
        isCorrect: true,
        pointsEarned: 10,
        __v: 0,
      } as any);
      jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue({});

      const req = mockRequest({
        userId: new Types.ObjectId(),
        questionId: questionId,
        userAnswer: "B", // errada
      });
      const res = mockResponse();

      await submitAnswerController(req, res);

      expect(AnswerLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          isCorrect: false,
          pointsEarned: 0,
        })
      );

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        req.body.userId,
        { $inc: { totalPoints: 0 } },
        { new: true }
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        correct: false,
        pointsEarned: 0,
      });
    });

    it("should handle internal error gracefully", async () => {
      jest.spyOn(Question, "findById").mockImplementation(() => {
        throw new Error("Unexpected error");
      });

      const req = mockRequest({
        userId: new Types.ObjectId(),
        questionId: new Types.ObjectId(),
        userAnswer: "A",
      });
      const res = mockResponse();

      await submitAnswerController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro interno ao salvar resposta",
      });
    });
  });

  describe("getAllAnswerLogsController", () => {
    it("should return all logs", async () => {
      const logsMock = [{}, {}];

      const populateChainMock = {
        populate: jest.fn().mockReturnThis(),
        then: jest.fn((callback: any) => callback(logsMock)),
      };

      jest.spyOn(AnswerLog, "find").mockReturnValue(populateChainMock as any);

      const req = mockRequest();
      const res = mockResponse();

      await getAllAnswerLogsController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(logsMock);
    });

    it("should handle error", async () => {
      const populateChainMock = {
        populate: jest.fn().mockReturnThis(),
        then: jest.fn((_resolve: any, reject: any) =>
          reject(new Error("DB error"))
        ),
      };

      jest.spyOn(AnswerLog, "find").mockReturnValue(populateChainMock as any);

      const req = mockRequest();
      const res = mockResponse();

      await getAllAnswerLogsController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao buscar logs de respostas",
      });
    });
  });

  describe("getAnswerLogsByUser", () => {
    it("should return logs by userId", async () => {
      const logsMock = [{}, {}];

      jest.spyOn(AnswerLog, "find").mockResolvedValue(logsMock);

      const req = mockRequest({}, { userId: "user123" });
      const res = mockResponse();

      await getAnswerLogsByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(logsMock);
    });

    it("should handle error", async () => {
      jest.spyOn(AnswerLog, "find").mockRejectedValue(new Error("DB error"));

      const req = mockRequest({}, { userId: "user123" });
      const res = mockResponse();

      await getAnswerLogsByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao buscar logs por usuário",
      });
    });
  });

  describe("deleteAllAnswerLogsByUser", () => {
    it("should delete logs and reset user progress", async () => {
      jest.spyOn(AnswerLog, "deleteMany").mockResolvedValue({
        acknowledged: true,
        deletedCount: 2,
      });
      jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue({});

      const req = mockRequest({}, { userId: "user123" });
      const res = mockResponse();

      await deleteAllAnswerLogsByUser(req, res);

      expect(AnswerLog.deleteMany).toHaveBeenCalledWith({ user: "user123" });
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        "user123",
        {
          $set: {
            currentLevel: "",
            currentSection: "",
            currentQuestion: "",
            trophies: 0,
            totalPoints: 0,
          },
        },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Logs excluídos e progresso resetado com sucesso.",
      });
    });

    it("should handle error", async () => {
      jest
        .spyOn(AnswerLog, "deleteMany")
        .mockRejectedValue(new Error("DB error"));

      const req = mockRequest({}, { userId: "user123" });
      const res = mockResponse();

      await deleteAllAnswerLogsByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao excluir logs e resetar progresso do usuário.",
      });
    });
  });
});
