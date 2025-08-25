import { IChallenge } from "../../interfaces";
import { ChallengeQuestion } from "../../models";

type ChallengeQuestionData = Partial<
  Omit<IChallenge, "_id" | "createdAt" | "updatedAt">
>;

export const ChallengeQuestionService = {
  async create(data: ChallengeQuestionData): Promise<IChallenge> {
    return ChallengeQuestion.create(data);
  },

  async findAll(): Promise<IChallenge[]> {
    return ChallengeQuestion.find();
  },

  async findById(id: string): Promise<IChallenge> {
    const question = await ChallengeQuestion.findById(id).populate("section");
    if (!question) {
      throw new Error("Questão não encontrada");
    }
    return question;
  },

  async update(id: string, data: ChallengeQuestionData): Promise<IChallenge> {
    const updatedQuestion = await ChallengeQuestion.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
    if (!updatedQuestion) {
      throw new Error("Questão não encontrada para atualizar");
    }
    return updatedQuestion;
  },

  async deleteById(id: string): Promise<void> {
    const result = await ChallengeQuestion.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Questão não encontrada para deletar");
    }
  },
};
