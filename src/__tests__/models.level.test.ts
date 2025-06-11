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

describe("Model de Nível", () => {
  it("Deve definir o model Level com o nome e schema corretos", () => {
    expect(mongooseModel).toHaveBeenCalledWith("Level", LevelSchema);
  });
});
