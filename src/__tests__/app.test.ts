/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import request from "supertest";

jest.mock("../routes", () => {
  const express = require("express");

  const mockAuthRouter = express.Router();
  mockAuthRouter.get("/", (_req: any, res: any) => {
    res.status(200).json({});
  });

  const routerLevel = express.Router();
  routerLevel.get("/", (_req: any, res: any) => {
    res.status(200).json({});
  });

  const routerLog = express.Router();
  routerLog.get("/", (_req: any, res: any) => {
    res.status(200).json({});
  });

  const routerQuestion = express.Router();
  routerQuestion.get("/", (_req: any, res: any) => {
    res.status(200).json({});
  });

  const routerSection = express.Router();
  routerSection.get("/", (_req: any, res: any) => {
    res.status(200).json({});
  });

  const routerUser = express.Router();
  routerUser.get("/", (_req: any, res: any) => {
    res.status(200).json({});
  });

  return {
    routerAuth: mockAuthRouter,
    routerLevel,
    routerLog,
    routerQuestion,
    routerSection,
    routerUser,
  };
});
let app: any;

beforeAll(async () => {
  app = (await import("../app")).default;
});

describe("Inicialização do App", () => {
  it("should be an instance of express", () => {
    expect(app).toBeDefined();
    expect(app).toHaveProperty("use");
    expect(app).toHaveProperty("listen");
  });

  it("Deve usar o middleware JSON", async () => {
    const res = await request(app).get("/api/auth");
    expect(res.status).not.toBe(404);
  });
});
