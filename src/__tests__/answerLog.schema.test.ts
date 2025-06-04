import mongoose from "mongoose";
import { AnswerLogSchema } from "../schemas/answerLog/answerLog.schema";

describe("AnswerLog Schema", () => {
  const AnswerLog = mongoose.model("AnswerLog", AnswerLogSchema);

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should require required fields", () => {
    const answerLog = new AnswerLog({});

    const validationError = answerLog.validateSync();
    expect(validationError?.errors.user).toBeDefined();
    expect(validationError?.errors.question).toBeDefined();
    expect(validationError?.errors.section).toBeDefined();
    expect(validationError?.errors.level).toBeDefined();
    expect(validationError?.errors.userAnswer).toBeDefined();
    expect(validationError?.errors.isCorrect).toBeDefined();
  });

  it("should default pointsEarned to 0", () => {
    const answerLog = new AnswerLog({
      user: new mongoose.Types.ObjectId(),
      question: new mongoose.Types.ObjectId(),
      section: new mongoose.Types.ObjectId(),
      level: new mongoose.Types.ObjectId(),
      userAnswer: "42",
      isCorrect: true,
    });

    expect(answerLog.pointsEarned).toBe(0);
  });

  it("should default answeredAt to current date", () => {
    const now = Date.now();
    const answerLog = new AnswerLog({
      user: new mongoose.Types.ObjectId(),
      question: new mongoose.Types.ObjectId(),
      section: new mongoose.Types.ObjectId(),
      level: new mongoose.Types.ObjectId(),
      userAnswer: "42",
      isCorrect: true,
    });

    expect(answerLog.answeredAt).toBeDefined();
    expect(answerLog.answeredAt.getTime()).toBeGreaterThanOrEqual(now);
  });
});
