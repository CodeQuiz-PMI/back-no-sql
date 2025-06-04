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

describe("Section model", () => {
  it("should define the Section model with correct name and schema", () => {
    expect(mongooseModel).toHaveBeenCalledWith("Section", SectionSchema);
  });
});
