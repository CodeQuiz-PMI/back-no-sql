import mongoose from "mongoose";
import { LevelSchema } from "../schemas/level/level.schema";

describe("Level Schema", () => {
  const Level = mongoose.model("Level", LevelSchema);

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should define required fields", async () => {
    const level = new Level({});

    const validationError = level.validateSync();
    expect(validationError?.errors.title).toBeDefined();
    expect(validationError?.errors.description).toBeDefined();
    expect(validationError?.errors.difficulty).toBeDefined();
  });

  it("should default createdAt field to current date", async () => {
    const now = Date.now();
    const level = new Level({
      title: "Level 1",
      description: "This is level 1",
      difficulty: "easy",
    });

    expect(level.createdAt).toBeDefined();
    expect(level.createdAt.getTime()).toBeGreaterThanOrEqual(now);
  });
});
