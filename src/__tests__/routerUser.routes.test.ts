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
  it("should be an Express router", () => {
    expect(routerUser).toBeDefined();
    expect(typeof routerUser).toBe("function");
    expect(routerUser.stack).toBeDefined();
  });

  it("should define GET /", () => {
    const route = routerUser.stack.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.route?.path === "/" && r.route.methods.get
    );
    expect(route).toBeDefined();
    expect(route?.route?.stack[0].handle).toBe(getAllUserController);
  });

  it("should define GET /:id with authMiddleware and asyncHandler", () => {
    const route = routerUser.stack.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.route?.path === "/:id" && r.route.methods.get
    );
    expect(route).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(authMiddleware);
    expect(middlewares).toContain(getUserByIdController);
  });

  it("should define PATCH /:id with authMiddleware and asyncHandler", () => {
    const route = routerUser.stack.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.route?.path === "/:id" && r.route.methods.patch
    );
    expect(route).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(authMiddleware);
    expect(middlewares).toContain(updateUserController);
  });

  it("should define DELETE /:id with authMiddleware and asyncHandler", () => {
    const route = routerUser.stack.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.route?.path === "/:id" && r.route.methods.delete
    );
    expect(route).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(authMiddleware);
    expect(middlewares).toContain(deleteUserController);
  });
});
