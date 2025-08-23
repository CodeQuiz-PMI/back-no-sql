import { Request, Response } from "express";
import { AnswerLogService } from "../../services";

const handleControllerError = (
  res: Response,
  error: unknown,
  message: string
) => {
  console.error(message, error);
  if (error instanceof Error && error.message.includes("não encontrado")) {
    return res.status(404).json({ error: error.message });
  }
  return res.status(500).json({ error: message });
};

export const submitAnswerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, questionId, userAnswer } = req.body;
    const result = await AnswerLogService.submitAnswer(
      userId,
      questionId,
      userAnswer
    );
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, "Erro interno ao salvar resposta");
  }
};

export const getAllAnswerLogsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const logs = await AnswerLogService.getAllLogs();
    res.status(200).json(logs);
  } catch (error) {
    handleControllerError(res, error, "Erro ao buscar logs de respostas");
  }
};

export const getAnswerLogsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const logs = await AnswerLogService.getLogsByUser(userId);
    res.status(200).json(logs);
  } catch (error) {
    handleControllerError(res, error, "Erro ao buscar logs por usuário");
  }
};

export const updateAnswerLogController = async (
  req: Request,
  res: Response
) => {
  try {
    const { logId } = req.params;
    const { userAnswer } = req.body;
    const updatedLog = await AnswerLogService.updateAnswer(logId, userAnswer);
    res.status(200).json({
      message: "Log de resposta atualizado com sucesso",
      updatedLog,
    });
  } catch (error) {
    handleControllerError(res, error, "Erro interno ao atualizar resposta");
  }
};

export const deleteAllAnswerLogsByUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    await AnswerLogService.deleteAllLogsByUser(userId);
    res
      .status(200)
      .json({ message: "Logs excluídos e progresso resetado com sucesso." });
  } catch (error) {
    handleControllerError(
      res,
      error,
      "Erro ao excluir logs e resetar progresso do usuário."
    );
  }
};
