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
      throw new Error("process.exit called");
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  it("should connect successfully when MONGO_URI is defined", async () => {
    process.env.MONGO_URI = "mongodb://localhost/testdb";
    (mongoose.connect as jest.Mock).mockResolvedValue(undefined);

    await connectDatabase();

    expect(mongoose.connect).toHaveBeenCalledWith("mongodb://localhost/testdb");
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "✅ Conectado ao MongoDB com sucesso!"
    );
  });

  it("should exit process if MONGO_URI is not defined", async () => {
    delete process.env.MONGO_URI;

    await expect(connectDatabase()).rejects.toThrow("process.exit called");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("❌ MONGO_URI não definida no .env")
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });

  it("should handle connection errors gracefully", async () => {
    process.env.MONGO_URI = "mongodb://localhost/testdb";
    (mongoose.connect as jest.Mock).mockRejectedValue(
      new Error("Connection failed")
    );

    await expect(connectDatabase()).rejects.toThrow("process.exit called");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "❌ Erro ao conectar no MongoDB:",
      expect.any(Error)
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });
});
