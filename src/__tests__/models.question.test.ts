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

describe("Question model", () => {
  it("should define the Question model with correct name and schema", () => {
    expect(mongooseModel).toHaveBeenCalledWith("Question", QuestionSchema);
  });
});
