import mongoose, { Model } from "mongoose";
import { IUser } from "../interfaces";
import { UserSchema } from "../schemas";

// Cria um modelo de teste usando o schema
const User: Model<IUser> = mongoose.model<IUser>("UserTest", UserSchema);

describe("UserSchema", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should require name, email, and password fields", async () => {
    const user = new User({}); // sem dados obrigatórios
    const validationError = user.validateSync();

    expect(validationError?.errors.name).toBeDefined();
    expect(validationError?.errors.email).toBeDefined();
    expect(validationError?.errors.password).toBeDefined();
  });

  it("should allow optional fields to be undefined", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    const validationError = user.validateSync();
    expect(validationError).toBeUndefined();
  });

  it("should set createdAt field automatically", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(user.createdAt).toBeDefined();
    expect(user.createdAt).toBeInstanceOf(Date);
  });
});
