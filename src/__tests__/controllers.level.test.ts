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

describe("Level Controller", () => {
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
    it("should create a level and return 201", async () => {
      const mockLevel = { id: "1", title: "Test Level" };
      (Level.create as jest.Mock).mockResolvedValue(mockLevel);

      await createLevelController(req as Request, res as Response);

      expect(Level.create).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockLevel);
    });

    it("should handle errors (instanceof Error)", async () => {
      (Level.create as jest.Mock).mockRejectedValue(new Error("DB error"));

      await createLevelController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "DB error" });
    });

    it("should handle non-Error thrown values", async () => {
      (Level.create as jest.Mock).mockRejectedValue("unexpected error");

      await createLevelController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Erro desconhecido." });
    });
  });

  describe("getAllLevelController", () => {
    it("should return all levels", async () => {
      const mockLevels = [{ id: "1" }, { id: "2" }];
      (Level.find as jest.Mock).mockResolvedValue(mockLevels);

      await getAllLevelController(req as Request, res as Response);

      expect(Level.find).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockLevels);
    });
  });

  describe("getLevelByIdController", () => {
    it("should return level if found", async () => {
      const mockLevel = { id: "1" };
      (Level.findById as jest.Mock).mockResolvedValue(mockLevel);

      req.params = { id: "1" };
      await getLevelByIdController(req as Request, res as Response);

      expect(Level.findById).toHaveBeenCalledWith("1");
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockLevel);
    });

    it("should return 404 if level not found", async () => {
      (Level.findById as jest.Mock).mockResolvedValue(null);

      req.params = { id: "1" };
      await getLevelByIdController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Nível não encontrado" });
    });
  });

  describe("updateLevelController", () => {
    it("should update level and return 201", async () => {
      const updatedLevel = { id: "1", title: "Updated" };
      (Level.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedLevel);

      req.params = { id: "1" };
      req.body = { title: "Updated" };

      await updateLevelController(req as Request, res as Response);

      expect(Level.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { title: "Updated" },
        { new: true }
      );
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(updatedLevel);
    });
  });

  describe("deleteLevelController", () => {
    it("should delete level and return 204", async () => {
      (Level.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      req.params = { id: "1" };

      await deleteLevelController(req as Request, res as Response);

      expect(Level.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(statusMock).toHaveBeenCalledWith(204);
      expect(sendMock).toHaveBeenCalled();
    });
  });
});
