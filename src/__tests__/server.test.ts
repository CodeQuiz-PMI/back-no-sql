import { jest } from "@jest/globals";
import app from "../app";
import { connectDatabase } from "../db";

jest.mock("../app", () => ({
  listen: jest.fn(),
}));
jest.mock("../db", () => ({
  connectDatabase: jest.fn(),
}));

describe("Inicialização do Servidor", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Deve chamar connectDatabase e app.listen com a porta padrão", async () => {
    await jest.isolateModulesAsync(async () => {
      await import("../server");
    });
    expect(connectDatabase).toHaveBeenCalled();
    expect(app.listen).toHaveBeenCalledWith(4000, expect.any(Function));
  });

  it("Deve usar a porta definida nas variáveis de ambiente se estiver configurada", async () => {
    process.env.PORT = "5000";
    await jest.isolateModulesAsync(async () => {
      await import("../server");
    });
    expect(app.listen).toHaveBeenCalledWith(5000, expect.any(Function));
    delete process.env.PORT;
  });

  it("Deve registrar mensagem de início do servidor", async () => {
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    (app.listen as jest.Mock).mockImplementation((...args: unknown[]) => {
      const callback = args[args.length - 1];
      if (typeof callback === "function") {
        callback();
      }
      return {} as unknown;
    });

    await import("../server");

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "🚀 Servidor rodando em http://localhost:4000"
    );
    consoleLogSpy.mockRestore();
  });
});
