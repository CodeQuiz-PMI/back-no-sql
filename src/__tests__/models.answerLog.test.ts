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

describe("AnswerLog model", () => {
  it("should define the AnswerLog model with correct name and schema", () => {
    expect(mongooseModel).toHaveBeenCalledWith("AnswerLog", AnswerLogSchema);
  });
});
