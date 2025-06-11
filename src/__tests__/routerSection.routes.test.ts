/* eslint-disable @typescript-eslint/no-explicit-any */
import routerSection from "../routes/section/section.routes";
import {
  createSectionController,
  deleteSectionController,
  getAllSectionController,
  getSectionByIdController,
  updateSectionController,
} from "../controllers";

// Mocks
jest.mock("../controllers/asyncHandler", () => ({
  asyncHandler: (fn: never) => fn,
}));

jest.mock("../controllers", () => ({
  createSectionController: jest.fn(),
  getAllSectionController: jest.fn(),
  getSectionByIdController: jest.fn(),
  updateSectionController: jest.fn(),
  deleteSectionController: jest.fn(),
}));

describe("routerSection", () => {
  it("Deve ser um router do Express", () => {
    expect(routerSection).toBeDefined();
    expect(typeof routerSection).toBe("function");
    expect(routerSection.stack).toBeDefined();
  });

  it("Deve definir POST /", () => {
    const route = routerSection.stack.find(
      (r: any) => r.route?.path === "/" && r.route.methods.post
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(createSectionController);
  });

  it("Deve definir GET /", () => {
    const route = routerSection.stack.find(
      (r: any) => r.route?.path === "/" && r.route.methods.get
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(getAllSectionController);
  });

  it("Deve definir GET /:id", () => {
    const route = routerSection.stack.find(
      (r: any) => r.route?.path === "/:id" && r.route.methods.get
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(getSectionByIdController);
  });

  it("Deve definir PUT /:id", () => {
    const route = routerSection.stack.find(
      (r: any) => r.route?.path === "/:id" && r.route.methods.put
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(updateSectionController);
  });

  it("Deve definir DELETE /:id", () => {
    const route = routerSection.stack.find(
      (r: any) => r.route?.path === "/:id" && r.route.methods.delete
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(deleteSectionController);
  });
});
