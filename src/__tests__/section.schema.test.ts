import mongoose from "mongoose";
import { SectionSchema } from "../schemas/section/section.schema";

describe("Schema de Section", () => {
  const Section = mongoose.model("Section", SectionSchema);

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("Deve definir campos obrigatórios", async () => {
    const section = new Section({});

    const validationError = section.validateSync();
    expect(validationError?.errors.title).toBeDefined();
    expect(validationError?.errors.description).toBeDefined();
    expect(validationError?.errors.level).toBeDefined();
  });

  it("Deve definir o campo createdAt com a data atual por padrão", async () => {
    const now = Date.now();
    const section = new Section({
      title: "Título de Teste",
      description: "Descrição de Teste",
      level: new mongoose.Types.ObjectId(),
    });

    expect(section.createdAt).toBeDefined();
    expect(section.createdAt.getTime()).toBeGreaterThanOrEqual(now);
  });

  it("Deve referenciar corretamente o modelo Level no campo level", () => {
    const section = new Section({
      title: "Título de Teste",
      description: "Descrição de Teste",
      level: new mongoose.Types.ObjectId(),
    });

    expect(section.level).toBeInstanceOf(mongoose.Types.ObjectId);
  });
});
