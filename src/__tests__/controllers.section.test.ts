import { Request, Response } from "express";
import { Section } from "../models";
import {
  createSectionController,
  getAllSectionController,
  getSectionByIdController,
  updateSectionController,
  deleteSectionController,
} from "../controllers";

jest.mock("../models", () => ({
  Section: {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

describe("Section Controller", () => {
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

  describe("createSectionController", () => {
    it("should create a section and return 201", async () => {
      const mockSection = { id: "1", title: "Test Section" };
      (Section.create as jest.Mock).mockResolvedValue(mockSection);

      await createSectionController(req as Request, res as Response);

      expect(Section.create).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockSection);
    });

    it("should handle errors (instanceof Error)", async () => {
      (Section.create as jest.Mock).mockRejectedValue(new Error("DB error"));

      await createSectionController(req as Request, res as Response);

      expect(console.error).toHaveBeenCalledWith(expect.any(Error));
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "DB error" });
    });

    it("should handle non-Error thrown values", async () => {
      (Section.create as jest.Mock).mockRejectedValue("unexpected error");

      await createSectionController(req as Request, res as Response);

      expect(console.error).toHaveBeenCalledWith("unexpected error");
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Erro desconhecido." });
    });
  });

  describe("getAllSectionController", () => {
    it("should return all sections with level populated", async () => {
      const mockSections = [{ id: "1" }];
      const populateMock = jest.fn().mockResolvedValue(mockSections);
      (Section.find as jest.Mock).mockReturnValue({ populate: populateMock });

      await getAllSectionController(req as Request, res as Response);

      expect(Section.find).toHaveBeenCalled();
      expect(populateMock).toHaveBeenCalledWith("level");
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockSections);
    });
  });

  describe("getSectionByIdController", () => {
    it("should return section if found", async () => {
      const mockSection = { id: "1" };
      const populateMock = jest.fn().mockResolvedValue(mockSection);
      (Section.findById as jest.Mock).mockReturnValue({
        populate: populateMock,
      });

      req.params = { id: "1" };
      await getSectionByIdController(req as Request, res as Response);

      expect(Section.findById).toHaveBeenCalledWith("1");
      expect(populateMock).toHaveBeenCalledWith("level");
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockSection);
    });

    it("should return 404 if section not found", async () => {
      const populateMock = jest.fn().mockResolvedValue(null);
      (Section.findById as jest.Mock).mockReturnValue({
        populate: populateMock,
      });

      req.params = { id: "1" };
      await getSectionByIdController(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Seção não encontrada" });
    });
  });

  describe("updateSectionController", () => {
    it("should update section and return 204", async () => {
      const updatedSection = { id: "1", title: "Updated" };
      (Section.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        updatedSection
      );

      req.params = { id: "1" };
      req.body = { title: "Updated" };

      await updateSectionController(req as Request, res as Response);

      expect(Section.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { title: "Updated" },
        { new: true }
      );
      expect(statusMock).toHaveBeenCalledWith(204);
      expect(jsonMock).toHaveBeenCalledWith(updatedSection);
    });
  });

  describe("deleteSectionController", () => {
    it("should delete section and return 204", async () => {
      (Section.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      req.params = { id: "1" };

      await deleteSectionController(req as Request, res as Response);

      expect(Section.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(statusMock).toHaveBeenCalledWith(204);
      expect(sendMock).toHaveBeenCalled();
    });
  });
});
