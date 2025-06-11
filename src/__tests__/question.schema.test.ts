import mongoose from "mongoose";
import { QuestionSchema } from "../schemas/question/question.schema";

describe("Schema de Questão", () => {
  const Question = mongoose.model("Question", QuestionSchema);

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("Deve definir campos obrigatórios", async () => {
    const question = new Question({});

    const validationError = question.validateSync();
    expect(validationError?.errors.title).toBeDefined();
    expect(validationError?.errors.text).toBeDefined();
    expect(validationError?.errors.answer).toBeDefined();
    expect(validationError?.errors.correctResponse).toBeDefined();
    expect(validationError?.errors.type).toBeDefined();
    expect(validationError?.errors.order).toBeDefined();
    expect(validationError?.errors.points).toBeDefined();
    expect(validationError?.errors.section).toBeDefined();
  });

  it("Deve definir o campo createdAt como a data atual por padrão", async () => {
    const now = Date.now();
    const question = new Question({
      title: "Título de Teste",
      text: "Texto de Teste",
      answer: "Resposta",
      correctResponse: "Correta",
      type: "múltipla escolha",
      order: 1,
      points: 10,
      section: new mongoose.Types.ObjectId(),
    });

    expect(question.createdAt).toBeDefined();
    expect(question.createdAt.getTime()).toBeGreaterThanOrEqual(now);
  });

  it("Deve referenciar corretamente o model Section no campo section", () => {
    const question = new Question({
      title: "Título de Teste",
      text: "Texto de Teste",
      answer: "Resposta",
      correctResponse: "Correta",
      type: "múltipla escolha",
      order: 1,
      points: 10,
      section: new mongoose.Types.ObjectId(),
    });

    expect(question.section).toBeInstanceOf(mongoose.Types.ObjectId);
  });
});
