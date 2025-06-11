import { model as mongooseModel } from "mongoose";
import "../models/question/question.model";
import { QuestionSchema } from "../schemas";

jest.mock("mongoose", () => {
  const actualMongoose = jest.requireActual("mongoose");
  return {
    ...actualMongoose,
    model: jest.fn(),
  };
});

describe("Model de Pergunta", () => {
  it("Deve definir o model Question com o nome e schema corretos", () => {
    expect(mongooseModel).toHaveBeenCalledWith("Question", QuestionSchema);
  });
});
