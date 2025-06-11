import mongoose from "mongoose";
import { LevelSchema } from "../schemas/level/level.schema";

describe("Schema de Nível", () => {
  const Level = mongoose.model("Level", LevelSchema);

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("Deve definir os campos obrigatórios", async () => {
    const level = new Level({});

    const validationError = level.validateSync();
    expect(validationError?.errors.title).toBeDefined();
    expect(validationError?.errors.description).toBeDefined();
    expect(validationError?.errors.difficulty).toBeDefined();
  });

  it("Deve definir o campo createdAt como a data atual", async () => {
    const now = Date.now();
    const level = new Level({
      title: "Nível 1",
      description: "Este é o nível 1",
      difficulty: "fácil",
    });

    expect(level.createdAt).toBeDefined();
    expect(level.createdAt.getTime()).toBeGreaterThanOrEqual(now);
  });
});
