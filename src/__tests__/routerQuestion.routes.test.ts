import routerQuestion from "../routes/question/question.routes";
import {
  createQuestionController,
  deleteQuestionController,
  getAllQuestionController,
  getQuestionByIdController,
  updateQuestionController,
} from "../controllers";

// Mocks
jest.mock("../controllers/asyncHandler", () => ({
  asyncHandler: (fn: never) => fn,
}));

jest.mock("../controllers", () => ({
  createQuestionController: jest.fn(),
  getAllQuestionController: jest.fn(),
  getQuestionByIdController: jest.fn(),
  updateQuestionController: jest.fn(),
  deleteQuestionController: jest.fn(),
}));

describe("routerQuestion", () => {
  it("should be an Express router", () => {
    expect(routerQuestion).toBeDefined();
    expect(typeof routerQuestion).toBe("function");
    expect(routerQuestion.stack).toBeDefined();
  });

  it("should define POST /", () => {
    const route = routerQuestion.stack.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.route?.path === "/" && r.route.methods.post
    );
    expect(route).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(createQuestionController);
  });

  it("should define GET /", () => {
    const route = routerQuestion.stack.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.route?.path === "/" && r.route.methods.get
    );
    expect(route).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(getAllQuestionController);
  });

  it("should define GET /:id", () => {
    const route = routerQuestion.stack.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.route?.path === "/:id" && r.route.methods.get
    );
    expect(route).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(getQuestionByIdController);
  });

  it("should define PUT /:id", () => {
    const route = routerQuestion.stack.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.route?.path === "/:id" && r.route.methods.put
    );
    expect(route).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(updateQuestionController);
  });

  it("should define DELETE /:id", () => {
    const route = routerQuestion.stack.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.route?.path === "/:id" && r.route.methods.delete
    );
    expect(route).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(deleteQuestionController);
  });
});
