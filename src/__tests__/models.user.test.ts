import { model as mongooseModel } from "mongoose";
import "../models/user/user.model";
import { UserSchema } from "../schemas";

jest.mock("mongoose", () => {
  const actualMongoose = jest.requireActual("mongoose");
  return {
    ...actualMongoose,
    model: jest.fn(),
  };
});

describe("User model", () => {
  it("should define the User model with correct name and schema", () => {
    expect(mongooseModel).toHaveBeenCalledWith("User", UserSchema);
  });
});
