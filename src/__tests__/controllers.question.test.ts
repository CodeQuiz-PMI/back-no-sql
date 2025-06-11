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

describe("Controlador de Questões", () => {
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
    it("Deve criar uma questão e retornar 201", async () => {
      const mockQuestion = { id: "1", title: "Questão de Exemplo" };
      (Question.create as jest.Mock).mockResolvedValue(mockQuestion);

      await createQuestionController(req as Request, res as Response);

      expect(Question.create).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockQuestion);
    });

    it("Deve tratar erros (instanceof Error)", async () => {
      (Question.create as jest.Mock).mockRejectedValue(
        new Error("Erro no banco")
      );

      await createQuestionController(req as Request, res as Response);

      expect(console.error).toHaveBeenCalledWith(expect.any(Error));
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Erro no banco" });
    });

    it("Deve tratar valores lançados que não são Error", async () => {
      (Question.create as jest.Mock).mockRejectedValue("erro inesperado");

      await createQuestionController(req as Request, res as Response);

      expect(console.error).toHaveBeenCalledWith("erro inesperado");
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Erro desconhecido." });
    });
  });

  describe("getAllQuestionController", () => {
    it("Deve retornar todas as questões com seção populada", async () => {
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
    it("Deve retornar a questão se encontrada", async () => {
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

    it("Deve retornar 404 se a questão não for encontrada", async () => {
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
    it("Deve atualizar a questão e retornar 201", async () => {
      const updatedQuestion = { id: "1", title: "Atualizada" };
      (Question.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        updatedQuestion
      );

      req.params = { id: "1" };
      req.body = { title: "Atualizada" };

      await updateQuestionController(req as Request, res as Response);

      expect(Question.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { title: "Atualizada" },
        { new: true }
      );
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(updatedQuestion);
    });
  });

  describe("deleteQuestionController", () => {
    it("Deve excluir a questão e retornar 204", async () => {
      (Question.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      req.params = { id: "1" };

      await deleteQuestionController(req as Request, res as Response);

      expect(Question.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(statusMock).toHaveBeenCalledWith(204);
      expect(sendMock).toHaveBeenCalled();
    });
  });
});
