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

describe("Model de Usuário", () => {
  it("Deve definir o model User com o nome e schema corretos", () => {
    expect(mongooseModel).toHaveBeenCalledWith("User", UserSchema);
  });
});
