import {
  routerUser,
  routerLevel,
  routerSection,
  routerQuestion,
  routerAuth,
  routerLog,
} from "../routes";

describe("Rotas index.ts", () => {
  it("should export all routers", () => {
    expect(routerUser).toBeDefined();
    expect(routerLevel).toBeDefined();
    expect(routerSection).toBeDefined();
    expect(routerQuestion).toBeDefined();
    expect(routerAuth).toBeDefined();
    expect(routerLog).toBeDefined();
  });
});
