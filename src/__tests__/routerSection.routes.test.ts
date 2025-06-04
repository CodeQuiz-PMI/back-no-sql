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
  it("should be an Express router", () => {
    expect(routerSection).toBeDefined();
    expect(typeof routerSection).toBe("function");
    expect(routerSection.stack).toBeDefined();
  });

  it("should define POST /", () => {
    const route = routerSection.stack.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.route?.path === "/" && r.route.methods.post
    );
    expect(route).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(createSectionController);
  });

  it("should define GET /", () => {
    const route = routerSection.stack.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.route?.path === "/" && r.route.methods.get
    );
    expect(route).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(getAllSectionController);
  });

  it("should define GET /:id", () => {
    const route = routerSection.stack.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.route?.path === "/:id" && r.route.methods.get
    );
    expect(route).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(getSectionByIdController);
  });

  it("should define PUT /:id", () => {
    const route = routerSection.stack.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.route?.path === "/:id" && r.route.methods.put
    );
    expect(route).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(updateSectionController);
  });

  it("should define DELETE /:id", () => {
    const route = routerSection.stack.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.route?.path === "/:id" && r.route.methods.delete
    );
    expect(route).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(deleteSectionController);
  });
});
