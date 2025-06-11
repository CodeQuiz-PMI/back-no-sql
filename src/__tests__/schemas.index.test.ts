import {
  UserSchema,
  LevelSchema,
  SectionSchema,
  QuestionSchema,
  AnswerLogSchema,
} from "../schemas";

describe("Schemas index.ts", () => {
  it("Deve exportar todos os schemas", () => {
    expect(UserSchema).toBeDefined();
    expect(LevelSchema).toBeDefined();
    expect(SectionSchema).toBeDefined();
    expect(QuestionSchema).toBeDefined();
    expect(AnswerLogSchema).toBeDefined();
  });
});
