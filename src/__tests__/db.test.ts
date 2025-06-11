import mongoose from "mongoose";
import { connectDatabase } from "../db";

jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("connectDatabase", () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let processExitSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    processExitSpy = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit chamado");
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  it("Deve conectar com sucesso quando MONGO_URI estiver definida", async () => {
    process.env.MONGO_URI = "mongodb://localhost/testdb";
    (mongoose.connect as jest.Mock).mockResolvedValue(undefined);

    await connectDatabase();

    expect(mongoose.connect).toHaveBeenCalledWith("mongodb://localhost/testdb");
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "✅ Conectado ao MongoDB com sucesso!"
    );
  });

  it("Deve encerrar o processo se MONGO_URI não estiver definida", async () => {
    delete process.env.MONGO_URI;

    await expect(connectDatabase()).rejects.toThrow("process.exit chamado");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("❌ MONGO_URI não definida no .env")
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });

  it("Deve lidar com erros de conexão de forma adequada", async () => {
    process.env.MONGO_URI = "mongodb://localhost/testdb";
    (mongoose.connect as jest.Mock).mockRejectedValue(
      new Error("Conexão falhou")
    );

    await expect(connectDatabase()).rejects.toThrow("process.exit chamado");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "❌ Erro ao conectar no MongoDB:",
      expect.any(Error)
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });
});
