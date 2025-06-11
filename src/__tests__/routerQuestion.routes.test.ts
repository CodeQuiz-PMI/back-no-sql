/* eslint-disable @typescript-eslint/no-explicit-any */
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
  it("Deve ser um router do Express", () => {
    expect(routerQuestion).toBeDefined();
    expect(typeof routerQuestion).toBe("function");
    expect(routerQuestion.stack).toBeDefined();
  });

  it("Deve definir POST /", () => {
    const route = routerQuestion.stack.find(
      (r: any) => r.route?.path === "/" && r.route.methods.post
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(createQuestionController);
  });

  it("Deve definir GET /", () => {
    const route = routerQuestion.stack.find(
      (r: any) => r.route?.path === "/" && r.route.methods.get
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(getAllQuestionController);
  });

  it("Deve definir GET /:id", () => {
    const route = routerQuestion.stack.find(
      (r: any) => r.route?.path === "/:id" && r.route.methods.get
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(getQuestionByIdController);
  });

  it("Deve definir PUT /:id", () => {
    const route = routerQuestion.stack.find(
      (r: any) => r.route?.path === "/:id" && r.route.methods.put
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(updateQuestionController);
  });

  it("Deve definir DELETE /:id", () => {
    const route = routerQuestion.stack.find(
      (r: any) => r.route?.path === "/:id" && r.route.methods.delete
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(deleteQuestionController);
  });
});
