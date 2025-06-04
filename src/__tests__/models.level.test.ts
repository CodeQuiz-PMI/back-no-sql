import { model as mongooseModel } from "mongoose";
import "../models/level/level.model";
import { LevelSchema } from "../schemas";

jest.mock("mongoose", () => {
  const actualMongoose = jest.requireActual("mongoose");
  return {
    ...actualMongoose,
    model: jest.fn(),
  };
});

describe("Level model", () => {
  it("should define the Level model with correct name and schema", () => {
    expect(mongooseModel).toHaveBeenCalledWith("Level", LevelSchema);
  });
});
