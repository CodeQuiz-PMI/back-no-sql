import { AnswerLog, Question, User } from "../../models";
import { Types } from "mongoose";

const findQuestionWithDetails = async (questionId: string | Types.ObjectId) => {
  const question = await Question.findById(questionId)
    .populate<{ section: { _id: Types.ObjectId; level: Types.ObjectId } }>({
      path: "section",
      populate: {
        path: "level",
        model: "Level",
      },
    })
    .exec();

  if (!question || !question.section || !question.section.level) {
    throw new Error("Questão, Seção ou Nível não encontrado");
  }

  return {
    question,
    section: question.section,
    level: question.section.level,
  };
};

export const AnswerLogService = {
  async submitAnswer(userId: string, questionId: string, userAnswer: string) {
    const { question, section, level } = await findQuestionWithDetails(
      questionId
    );

    const isCorrect = userAnswer.trim() === question.correctResponse.trim();
    const pointsEarned = isCorrect ? question.points : 0;
    const coinsEarned = isCorrect ? Number(question.coinsValues) : 0;

    await Promise.all([
      AnswerLog.create({
        user: userId,
        question: question._id,
        section: section._id,
        level: level._id,
        userAnswer,
        isCorrect,
        pointsEarned,
      }),
      User.findByIdAndUpdate(userId, { $inc: { coins: coinsEarned } }),
    ]);

    return { correct: isCorrect, pointsEarned };
  },

  async getAllLogs() {
    return AnswerLog.find()
      .populate("user", "name email")
      .populate("question", "title")
      .populate("section", "title")
      .populate("level", "title");
  },

  async getLogsByUser(userId: string) {
    return AnswerLog.find({ user: userId });
  },

  async updateAnswer(logId: string, userAnswer: string) {
    const existingLog = await AnswerLog.findById(logId).exec();
    if (!existingLog) {
      throw new Error("Log de resposta não encontrado");
    }

    const { question } = await findQuestionWithDetails(existingLog.question);

    const isCorrect = userAnswer.trim() === question.correctResponse.trim();
    const newPoints = 0;

    existingLog.userAnswer = userAnswer;
    existingLog.isCorrect = isCorrect;
    existingLog.pointsEarned = newPoints;

    const [updatedLog] = await Promise.all([
      existingLog.save(),
      User.findByIdAndUpdate(existingLog.user, {
        $inc: { totalPoints: 0 },
      }),
    ]);

    return updatedLog;
  },

  async deleteAllLogsByUser(userId: string) {
    await Promise.all([
      AnswerLog.deleteMany({ user: userId }),
      User.findByIdAndUpdate(userId, {
        $set: {
          currentLevel: "",
          currentSection: "",
          currentQuestion: "",
          trophies: 0,
          totalPoints: 0,
          record: 0,
        },
      }),
    ]);
  },
};
