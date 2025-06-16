import { Router } from "express";
import {
  submitAnswerController,
  getAllAnswerLogsController,
  getAnswerLogsByUser,
  deleteAllAnswerLogsByUser,
  updateAnswerLogController,
} from "../../controllers";
import { asyncHandler } from "../../controllers/asyncHandler";

const routerLog = Router();

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Registro de respostas dos usuários
 */

/**
 * @swagger
 * /logs:
 *   post:
 *     summary: Registra a resposta de um usuário a uma questão
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - questionId
 *               - userAnswer
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 665bd1599c2b34e2aab71eff
 *               questionId:
 *                 type: string
 *                 example: 665bd25e9c2b34e2aab71f05
 *               userAnswer:
 *                 type: string
 *                 example: print("Olá, mundo!")
 *     responses:
 *       201:
 *         description: Resposta registrada com sucesso
 *       400:
 *         description: Dados inválidos
 */
routerLog.post("/", asyncHandler(submitAnswerController));

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Retorna todos os registros de respostas
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Lista de logs retornada com sucesso
 */
routerLog.get("/", asyncHandler(getAllAnswerLogsController));

/**
 * @swagger
 * /logs/user/{userId}:
 *   get:
 *     summary: Retorna os registros de respostas de um usuário
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Logs do usuário retornados com sucesso
 *       404:
 *         description: Usuário não encontrado ou sem logs
 */
routerLog.get("/user/:userId", asyncHandler(getAnswerLogsByUser));

/**
 * @swagger
 * /logs/{logId}:
 *   put:
 *     summary: Atualiza uma resposta do usuário
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: logId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do log de resposta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userAnswer
 *             properties:
 *               userAnswer:
 *                 type: string
 *                 example: print("Olá, mundo!")
 *     responses:
 *       200:
 *         description: Log atualizado com sucesso
 *       404:
 *         description: Log de resposta não encontrado
 *       500:
 *         description: Erro interno
 */
routerLog.put("/:logId", asyncHandler(updateAnswerLogController));

/**
 * @swagger
 * /logs/user/{userId}:
 *   delete:
 *     summary: Remove todos os registros de respostas de um usuário
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Logs do usuário removidos com sucesso
 *       404:
 *         description: Usuário não encontrado ou sem logs
 */
routerLog.delete("/user/:userId", asyncHandler(deleteAllAnswerLogsByUser));

export default routerLog;
