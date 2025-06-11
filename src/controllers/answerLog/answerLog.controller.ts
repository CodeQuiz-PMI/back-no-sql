/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnswerLog, Level, Question, Section, User } from "../../models";
import { Request, Response } from "express";

export const submitAnswerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, questionId, userAnswer } = req.body;

    // Busca a questão pelo ID
    const question = await Question.findById(questionId).exec();
    if (!question) {
      res.status(404).json({ error: "Questão não encontrada" });
      return;
    }

    // Busca a seção da questão
    const section = await Section.findById(question.section).exec();
    if (!section) {
      res.status(404).json({ error: "Seção não encontrada" });
      return;
    }

    // Busca o nível da seção
    const level = await Level.findById(section.level).exec();
    if (!level) {
      res.status(404).json({ error: "Nível não encontrado" });
      return;
    }

    // Verifica se a resposta está correta
    const isCorrect = userAnswer.trim() === question.correctResponse.trim();
    const pointsEarned = isCorrect ? question.points : 0;

    // Cria o log de resposta
    await AnswerLog.create({
      user: userId,
      question: question._id,
      section: section._id,
      level: level._id,
      userAnswer,
      isCorrect,
      pointsEarned,
    });

    // Atualiza os pontos do usuário
    await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: pointsEarned } },
      { new: true }
    );

    res.status(200).json({ correct: isCorrect, pointsEarned });
  } catch (error) {
    console.error("Erro ao salvar resposta:", error);
    res.status(500).json({ error: "Erro interno ao salvar resposta" });
  }
};

export const getAllAnswerLogsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const logs = await AnswerLog.find()
      .populate("user", "name email")
      .populate("question", "title")
      .populate("section", "title")
      .populate("level", "title");

    res.status(200).json(logs);
  } catch (error) {
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

export const deleteAllAnswerLogsByUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    await AnswerLog.deleteMany({ user: userId });

    await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          currentLevel: "",
          currentSection: "",
          currentQuestion: "",
          trophies: 0,
          totalPoints: 0,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Logs excluídos e progresso resetado com sucesso." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao excluir logs e resetar progresso do usuário." });
  }
};
