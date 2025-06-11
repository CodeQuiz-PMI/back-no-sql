import { model as mongooseModel } from "mongoose";
import "../models/section/section.model";
import { SectionSchema } from "../schemas";

jest.mock("mongoose", () => {
  const actualMongoose = jest.requireActual("mongoose");
  return {
    ...actualMongoose,
    model: jest.fn(),
  };
});

describe("Model de Seção", () => {
  it("Deve definir o model Section com o nome e schema corretos", () => {
    expect(mongooseModel).toHaveBeenCalledWith("Section", SectionSchema);
  });
});
