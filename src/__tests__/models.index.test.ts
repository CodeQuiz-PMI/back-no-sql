import * as models from "../models";
import { User } from "../models/user/user.model";
import { Level } from "../models/level/level.model";
import { Section } from "../models/section/section.model";
import { Question } from "../models/question/question.model";
import { AnswerLog } from "../models/answerLog/answerLog.model";

describe("Índice de Models", () => {
  it("Deve exportar todos os models corretamente", () => {
    expect(models.User).toBe(User);
    expect(models.Level).toBe(Level);
    expect(models.Section).toBe(Section);
    expect(models.Question).toBe(Question);
    expect(models.AnswerLog).toBe(AnswerLog);
  });
});
