import { IQuestion } from "../../interfaces";
import { Question } from "../../models";

type QuestionData = Partial<Omit<IQuestion, "_id">>;

export const QuestionService = {
  async create(data: QuestionData): Promise<IQuestion> {
    return Question.create(data);
  },

  async findAll(): Promise<IQuestion[]> {
    return Question.find().populate("section");
  },

  async findById(id: string): Promise<IQuestion> {
    const question = await Question.findById(id).populate("section");
    if (!question) {
      throw new Error("Questão não encontrada");
    }
    return question;
  },

  async update(id: string, data: QuestionData): Promise<IQuestion> {
    const updatedQuestion = await Question.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedQuestion) {
      throw new Error("Questão não encontrada para atualizar");
    }
    return updatedQuestion;
  },

  async deleteById(id: string): Promise<void> {
    const result = await Question.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Questão não encontrada para deletar");
    }
  },
};
