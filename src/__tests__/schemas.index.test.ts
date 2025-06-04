import {
  UserSchema,
  LevelSchema,
  SectionSchema,
  QuestionSchema,
  AnswerLogSchema,
} from "../schemas";

describe("Schemas index.ts", () => {
  it("should export all schemas", () => {
    expect(UserSchema).toBeDefined();
    expect(LevelSchema).toBeDefined();
    expect(SectionSchema).toBeDefined();
    expect(QuestionSchema).toBeDefined();
    expect(AnswerLogSchema).toBeDefined();
  });
});
