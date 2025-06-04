import mongoose from "mongoose";
import { QuestionSchema } from "../schemas/question/question.schema";

describe("Question Schema", () => {
  const Question = mongoose.model("Question", QuestionSchema);

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should define required fields", async () => {
    const question = new Question({});

    const validationError = question.validateSync();
    expect(validationError?.errors.title).toBeDefined();
    expect(validationError?.errors.text).toBeDefined();
    expect(validationError?.errors.answer).toBeDefined();
    expect(validationError?.errors.correctResponse).toBeDefined();
    expect(validationError?.errors.type).toBeDefined();
    expect(validationError?.errors.order).toBeDefined();
    expect(validationError?.errors.points).toBeDefined();
    expect(validationError?.errors.section).toBeDefined();
  });

  it("should default createdAt field to current date", async () => {
    const now = Date.now();
    const question = new Question({
      title: "Test Title",
      text: "Test Text",
      answer: "Answer",
      correctResponse: "Correct",
      type: "multiple-choice",
      order: 1,
      points: 10,
      section: new mongoose.Types.ObjectId(),
    });

    expect(question.createdAt).toBeDefined();
    expect(question.createdAt.getTime()).toBeGreaterThanOrEqual(now);
  });

  it("should correctly reference Section model in section field", () => {
    const question = new Question({
      title: "Test Title",
      text: "Test Text",
      answer: "Answer",
      correctResponse: "Correct",
      type: "multiple-choice",
      order: 1,
      points: 10,
      section: new mongoose.Types.ObjectId(),
    });

    expect(question.section).toBeInstanceOf(mongoose.Types.ObjectId);
  });
});
