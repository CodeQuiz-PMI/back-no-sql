import { Request, Response } from "express";
import { Level } from "../models";
import {
  createLevelController,
  getAllLevelController,
  getLevelByIdController,
  updateLevelController,
  deleteLevelController,
} from "../controllers";

jest.mock("../models", () => ({
  Level: {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

describe("Controlador de Níveis", () => {
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

  describe("createLevelController", () => {
    it("Deve criar um nível e retornar 201", async () => {
      const mockLevel = { id: "1", title: "Nível de Teste" };
      (Level.create as jest.Mock).mockResolvedValue(mockLevel);

      await createLevelController(req as Request, res as Response);

      expect(Level.create).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockLevel);
    });

    it("Deve tratar erros (instanceof Error)", async () => {
      (Level.create as jest.Mock).mockRejectedValue(new Error("Erro no banco"));

      await createLevelController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Erro no banco" });
    });

    it("Deve tratar valores lançados que não são Error", async () => {
      (Level.create as jest.Mock).mockRejectedValue("erro inesperado");

      await createLevelController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Erro desconhecido." });
    });
  });

  describe("getAllLevelController", () => {
    it("Deve retornar todos os níveis", async () => {
      const mockLevels = [{ id: "1" }, { id: "2" }];
      (Level.find as jest.Mock).mockResolvedValue(mockLevels);

      await getAllLevelController(req as Request, res as Response);

      expect(Level.find).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockLevels);
    });
  });

  describe("getLevelByIdController", () => {
    it("Deve retornar o nível se encontrado", async () => {
      const mockLevel = { id: "1" };
      (Level.findById as jest.Mock).mockResolvedValue(mockLevel);

      req.params = { id: "1" };
      await getLevelByIdController(req as Request, res as Response);

      expect(Level.findById).toHaveBeenCalledWith("1");
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockLevel);
    });

    it("Deve retornar 404 se o nível não for encontrado", async () => {
      (Level.findById as jest.Mock).mockResolvedValue(null);

      req.params = { id: "1" };
      await getLevelByIdController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Nível não encontrado" });
    });
  });

  describe("updateLevelController", () => {
    it("Deve atualizar o nível e retornar 201", async () => {
      const updatedLevel = { id: "1", title: "Atualizado" };
      (Level.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedLevel);

      req.params = { id: "1" };
      req.body = { title: "Atualizado" };

      await updateLevelController(req as Request, res as Response);

      expect(Level.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { title: "Atualizado" },
        { new: true }
      );
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(updatedLevel);
    });
  });

  describe("deleteLevelController", () => {
    it("Deve excluir o nível e retornar 204", async () => {
      (Level.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      req.params = { id: "1" };

      await deleteLevelController(req as Request, res as Response);

      expect(Level.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(statusMock).toHaveBeenCalledWith(204);
      expect(sendMock).toHaveBeenCalled();
    });
  });
});
