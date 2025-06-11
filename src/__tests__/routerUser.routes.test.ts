/* eslint-disable @typescript-eslint/no-explicit-any */
import routerUser from "../routes/user/user.routes";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  deleteUserController,
  getAllUserController,
  getUserByIdController,
  updateUserController,
} from "../controllers";

jest.mock("../middlewares/auth.middleware", () => ({
  authMiddleware: jest.fn((req, res, next) => next()),
}));

jest.mock("../controllers/asyncHandler", () => ({
  asyncHandler: (fn: never) => fn,
}));

jest.mock("../controllers", () => ({
  deleteUserController: jest.fn(),
  getAllUserController: jest.fn(),
  getUserByIdController: jest.fn(),
  updateUserController: jest.fn(),
}));

describe("routerUser", () => {
  it("Deve ser um router do Express", () => {
    expect(routerUser).toBeDefined();
    expect(typeof routerUser).toBe("function");
    expect(routerUser.stack).toBeDefined();
  });

  it("Deve definir GET /", () => {
    const route = routerUser.stack.find(
      (r: any) => r.route?.path === "/" && r.route.methods.get
    );
    expect(route).toBeDefined();
    expect(route?.route?.stack[0].handle).toBe(getAllUserController);
  });

  it("Deve definir GET /:id com authMiddleware e asyncHandler", () => {
    const route = routerUser.stack.find(
      (r: any) => r.route?.path === "/:id" && r.route.methods.get
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(authMiddleware);
    expect(middlewares).toContain(getUserByIdController);
  });

  it("Deve definir PATCH /:id com authMiddleware e asyncHandler", () => {
    const route = routerUser.stack.find(
      (r: any) => r.route?.path === "/:id" && r.route.methods.patch
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(authMiddleware);
    expect(middlewares).toContain(updateUserController);
  });

  it("Deve definir DELETE /:id com authMiddleware e asyncHandler", () => {
    const route = routerUser.stack.find(
      (r: any) => r.route?.path === "/:id" && r.route.methods.delete
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(authMiddleware);
    expect(middlewares).toContain(deleteUserController);
  });
});
