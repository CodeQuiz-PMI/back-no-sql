import mongoose, { Model } from "mongoose";
import { IUser } from "../interfaces";
import { UserSchema } from "../schemas";

const User: Model<IUser> = mongoose.model<IUser>("UserTest", UserSchema);

describe("UserSchema", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("Deve exigir os campos name, email e password", async () => {
    const user = new User({}); // sem dados obrigatórios
    const validationError = user.validateSync();

    expect(validationError?.errors.name).toBeDefined();
    expect(validationError?.errors.email).toBeDefined();
    expect(validationError?.errors.password).toBeDefined();
  });

  it("Deve permitir que campos opcionais fiquem indefinidos", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    const validationError = user.validateSync();
    expect(validationError).toBeUndefined();
  });

  it("Deve definir automaticamente o campo createdAt", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(user.createdAt).toBeDefined();
    expect(user.createdAt).toBeInstanceOf(Date);
  });
});
