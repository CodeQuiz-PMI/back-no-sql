import { model as mongooseModel } from "mongoose";
import "../models/answerLog/answerLog.model";
import { AnswerLogSchema } from "../schemas";

jest.mock("mongoose", () => {
  const actualMongoose = jest.requireActual("mongoose");
  return {
    ...actualMongoose,
    model: jest.fn(),
  };
});

describe("Modelo AnswerLog", () => {
  it("Deve definir o modelo AnswerLog com o nome e o schema corretos", () => {
    expect(mongooseModel).toHaveBeenCalledWith("AnswerLog", AnswerLogSchema);
  });
});
