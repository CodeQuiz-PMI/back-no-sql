import { Request, Response } from "express";
import { Question } from "../models";
import {
  createQuestionController,
  getAllQuestionController,
  getQuestionByIdController,
  updateQuestionController,
  deleteQuestionController,
} from "../controllers";

jest.mock("../models", () => ({
  Question: {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

describe("Question Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    sendMock = jest.fn();

    req = { params: {}, body: {} };
    res = {
      status: statusMock,
      json: jsonMock,
      send: sendMock,
    };

    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("createQuestionController", () => {
    it("should create a question and return 201", async () => {
      const mockQuestion = { id: "1", title: "Sample Question" };
      (Question.create as jest.Mock).mockResolvedValue(mockQuestion);

      await createQuestionController(req as Request, res as Response);

      expect(Question.create).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockQuestion);
    });

    it("should handle errors (instanceof Error)", async () => {
      (Question.create as jest.Mock).mockRejectedValue(new Error("DB error"));

      await createQuestionController(req as Request, res as Response);

      expect(console.error).toHaveBeenCalledWith(expect.any(Error));
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "DB error" });
    });

    it("should handle non-Error thrown values", async () => {
      (Question.create as jest.Mock).mockRejectedValue("unexpected error");

      await createQuestionController(req as Request, res as Response);

      expect(console.error).toHaveBeenCalledWith("unexpected error");
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Erro desconhecido." });
    });
  });

  describe("getAllQuestionController", () => {
    it("should return all questions with section populated", async () => {
      const mockQuestions = [{ id: "1" }];
      const populateMock = jest.fn().mockResolvedValue(mockQuestions);
      (Question.find as jest.Mock).mockReturnValue({ populate: populateMock });

      await getAllQuestionController(req as Request, res as Response);

      expect(Question.find).toHaveBeenCalled();
      expect(populateMock).toHaveBeenCalledWith("section");
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockQuestions);
    });
  });

  describe("getQuestionByIdController", () => {
    it("should return question if found", async () => {
      const mockQuestion = { id: "1" };
      const populateMock = jest.fn().mockResolvedValue(mockQuestion);
      (Question.findById as jest.Mock).mockReturnValue({
        populate: populateMock,
      });

      req.params = { id: "1" };
      await getQuestionByIdController(req as Request, res as Response);

      expect(Question.findById).toHaveBeenCalledWith("1");
      expect(populateMock).toHaveBeenCalledWith("section");
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockQuestion);
    });

    it("should return 404 if question not found", async () => {
      const populateMock = jest.fn().mockResolvedValue(null);
      (Question.findById as jest.Mock).mockReturnValue({
        populate: populateMock,
      });

      req.params = { id: "1" };
      await getQuestionByIdController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Questão não encontrada",
      });
    });
  });

  describe("updateQuestionController", () => {
    it("should update question and return 201", async () => {
      const updatedQuestion = { id: "1", title: "Updated" };
      (Question.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        updatedQuestion
      );

      req.params = { id: "1" };
      req.body = { title: "Updated" };

      await updateQuestionController(req as Request, res as Response);

      expect(Question.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { title: "Updated" },
        { new: true }
      );
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(updatedQuestion);
    });
  });

  describe("deleteQuestionController", () => {
    it("should delete question and return 204", async () => {
      (Question.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      req.params = { id: "1" };

      await deleteQuestionController(req as Request, res as Response);

      expect(Question.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(statusMock).toHaveBeenCalledWith(204);
      expect(sendMock).toHaveBeenCalled();
    });
  });
});
