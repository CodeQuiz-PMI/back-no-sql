/* eslint-disable @typescript-eslint/no-explicit-any */
import routerAuth from "../routes/auth/auth.routes";
import { login, register } from "../controllers";

// Mocks
jest.mock("../controllers/asyncHandler", () => ({
  asyncHandler: (fn: never) => fn,
}));

jest.mock("../controllers", () => ({
  login: jest.fn(),
  register: jest.fn(),
}));

describe("routerAuth", () => {
  it("Deve ser um router do Express", () => {
    expect(routerAuth).toBeDefined();
    expect(typeof routerAuth).toBe("function");
    expect(routerAuth.stack).toBeDefined();
  });

  it("Deve definir POST /register", () => {
    const route = routerAuth.stack.find(
      (r: any) => r.route?.path === "/register" && r.route.methods.post
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(register);
  });

  it("Deve definir POST /login", () => {
    const route = routerAuth.stack.find(
      (r: any) => r.route?.path === "/login" && r.route.methods.post
    );
    expect(route).toBeDefined();
    const middlewares = route?.route?.stack.map((s: any) => s.handle);
    expect(middlewares).toContain(login);
  });
});
