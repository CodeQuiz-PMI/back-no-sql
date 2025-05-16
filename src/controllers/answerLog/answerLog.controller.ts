import { QuestionWithPopulatedSection } from "../../interfaces";
import { AnswerLog, Level, Question, User } from "../../models";
import { Request, Response } from "express";

export const submitAnswerController = async (req: Request, res: Response) => {
  try {
    const { userId, questionId, userAnswer } = req.body;

    const question = await Question.findById(questionId).populate("section");

    if (!question || !question.section) {
      return res.status(404).json({ error: "Questão ou seção não encontrada" });
    }

    const questionWithSection =
      question as unknown as QuestionWithPopulatedSection;

    const level = await Level.findById(questionWithSection.section.level);

    if (!level) {
      return res.status(404).json({ error: "Nível não encontrado" });
    }

    const isCorrect = userAnswer.trim() === question.correctResponse.trim();
    const pointsEarned = isCorrect ? question.points : 0;

    await AnswerLog.create({
      user: userId,
      question: question._id,
      section: question.section._id,
      level: level._id,
      userAnswer,
      isCorrect,
      pointsEarned,
    });

    await User.findByIdAndUpdate(userId, {
      $inc: { totalPoints: pointsEarned },
    });

    res.status(200).json({ correct: isCorrect, pointsEarned });
  } catch (error) {
    console.error("Erro ao salvar resposta:", error);
    res.status(500).json({ error: "Erro ao salvar resposta" });
  }
};

export const getAllAnswerLogsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const logs = await AnswerLog.find()
      .populate("user", "name email") // só traz nome e email do usuário
      .populate("question", "title")
      .populate("section", "title")
      .populate("level", "title");

    res.status(200).json(logs);
  } catch (error) {
    console.error("Erro ao buscar logs de respostas:", error);
    res.status(500).json({ error: "Erro ao buscar logs de respostas" });
  }
};

export const getAnswerLogsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const logs = await AnswerLog.find({ user: userId });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar logs por usuário" });
  }
};
