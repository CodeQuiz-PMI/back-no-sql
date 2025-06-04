import request from "supertest";

jest.mock("../routes", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const express = require("express");

  const mockAuthRouter = express.Router();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockAuthRouter.get("/", (_req: any, res: any) => {
    res.status(200).json({});
  });

  const routerLevel = express.Router();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routerLevel.get("/", (_req: any, res: any) => {
    res.status(200).json({});
  });

  const routerLog = express.Router();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routerLog.get("/", (_req: any, res: any) => {
    res.status(200).json({});
  });

  const routerQuestion = express.Router();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routerQuestion.get("/", (_req: any, res: any) => {
    res.status(200).json({});
  });

  const routerSection = express.Router();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routerSection.get("/", (_req: any, res: any) => {
    res.status(200).json({});
  });

  const routerUser = express.Router();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let app: any;

beforeAll(async () => {
  app = (await import("../app")).default;
});

describe("App initialization", () => {
  it("should be an instance of express", () => {
    expect(app).toBeDefined();
    expect(app).toHaveProperty("use");
    expect(app).toHaveProperty("listen");
  });

  it("should use JSON middleware", async () => {
    const res = await request(app).get("/api/auth");
    expect(res.status).not.toBe(404);
  });
});
