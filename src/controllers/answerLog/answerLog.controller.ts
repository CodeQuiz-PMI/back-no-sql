/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnswerLog, Level, Question, Section, User } from "../../models";
import { Request, Response } from "express";

export const submitAnswerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, questionId, userAnswer } = req.body;

    const question = await Question.findById(questionId).exec();
    if (!question) {
      res.status(404).json({ error: "Questão não encontrada" });
      return;
    }

    const section = await Section.findById(question.section).exec();
    if (!section) {
      res.status(404).json({ error: "Seção não encontrada" });
      return;
    }

    const level = await Level.findById(section.level).exec();
    if (!level) {
      res.status(404).json({ error: "Nível não encontrado" });
      return;
    }

    const isCorrect = userAnswer.trim() === question.correctResponse.trim();
    const pointsEarned = isCorrect ? question.points : 0;
    const coinsEarned = isCorrect ? Number(question.coinsValues) : 0;

    await AnswerLog.create({
      user: userId,
      question: question._id,
      section: section._id,
      level: level._id,
      userAnswer,
      isCorrect,
      pointsEarned,
    });

    await User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          coins: coinsEarned,
        },
      },
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

export const updateAnswerLogController = async (
  req: Request,
  res: Response
) => {
  try {
    const { logId } = req.params;
    const { userAnswer } = req.body;

    const existingLog = await AnswerLog.findById(logId).exec();
    if (!existingLog) {
      return res.status(404).json({ error: "Log de resposta não encontrado" });
    }

    const question = await Question.findById(existingLog.question).exec();
    if (!question) {
      return res.status(404).json({ error: "Questão não encontrada" });
    }

    const oldPoints = existingLog.pointsEarned;
    const isCorrect = userAnswer.trim() === question.correctResponse.trim();
    const newPoints = isCorrect ? question.points : 0;

    existingLog.userAnswer = userAnswer;
    existingLog.isCorrect = isCorrect;
    existingLog.pointsEarned = newPoints;
    await existingLog.save();

    const pointsDifference = newPoints - oldPoints;
    await User.findByIdAndUpdate(existingLog.user, {
      $inc: { totalPoints: pointsDifference },
    });

    res.status(200).json({
      message: "Log de resposta atualizado com sucesso",
      updatedLog: existingLog,
    });
  } catch (error) {
    console.error("Erro ao atualizar log de resposta:", error);
    res.status(500).json({ error: "Erro interno ao atualizar resposta" });
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
          record: 0,
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
