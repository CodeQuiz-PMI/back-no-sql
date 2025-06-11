/* eslint-disable @typescript-eslint/no-explicit-any */
import routerLevel from "../routes/level/level.routes";
import {
  createLevelController,
  deleteLevelController,
  getAllLevelController,
  getLevelByIdController,
  updateLevelController,
} from "../controllers";

// Mocks
jest.mock("../controllers/asyncHandler", () => ({
  asyncHandler: (fn: never) => fn,
}));

jest.mock("../controllers", () => ({
  createLevelController: jest.fn(),
  getAllLevelController: jest.fn(),
  getLevelByIdController: jest.fn(),
  updateLevelController: jest.fn(),
  deleteLevelController: jest.fn(),
}));

describe("routerLevel", () => {
  it("Deve ser um router do Express", () => {
    expect(routerLevel).toBeDefined();
    expect(typeof routerLevel).toBe("function");
    expect(routerLevel.stack).toBeDefined();
  });

  it("Deve definir POST /", () => {
    const route = routerLevel.stack.find(
      (r: any) => r.route?.path === "/" && r.route.methods.post
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(createLevelController);
  });

  it("Deve definir GET /", () => {
    const route = routerLevel.stack.find(
      (r: any) => r.route?.path === "/" && r.route.methods.get
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(getAllLevelController);
  });

  it("Deve definir GET /:id", () => {
    const route = routerLevel.stack.find(
      (r: any) => r.route?.path === "/:id" && r.route.methods.get
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(getLevelByIdController);
  });

  it("Deve definir PUT /:id", () => {
    const route = routerLevel.stack.find(
      (r: any) => r.route?.path === "/:id" && r.route.methods.put
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(updateLevelController);
  });

  it("Deve definir DELETE /:id", () => {
    const route = routerLevel.stack.find(
      (r: any) => r.route?.path === "/:id" && r.route.methods.delete
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(deleteLevelController);
  });
});
