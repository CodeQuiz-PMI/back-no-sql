import mongoose from "mongoose";
import { SectionSchema } from "../schemas/section/section.schema";

describe("Section Schema", () => {
  const Section = mongoose.model("Section", SectionSchema);

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should define required fields", async () => {
    const section = new Section({});

    const validationError = section.validateSync();
    expect(validationError?.errors.title).toBeDefined();
    expect(validationError?.errors.description).toBeDefined();
    expect(validationError?.errors.level).toBeDefined();
  });

  it("should default createdAt field to current date", async () => {
    const now = Date.now();
    const section = new Section({
      title: "Test Title",
      description: "Test Description",
      level: new mongoose.Types.ObjectId(),
    });

    expect(section.createdAt).toBeDefined();
    expect(section.createdAt.getTime()).toBeGreaterThanOrEqual(now);
  });

  it("should correctly reference Level model in level field", () => {
    const section = new Section({
      title: "Test Title",
      description: "Test Description",
      level: new mongoose.Types.ObjectId(),
    });

    expect(section.level).toBeInstanceOf(mongoose.Types.ObjectId);
  });
});
