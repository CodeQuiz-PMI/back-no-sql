import { Router } from "express";
import {
  createChallengeController,
  deleteChallengeController,
  getAllChallengeController,
  getChallengeByIdController,
  updateChallengeController,
} from "../../controllers";
import { asyncHandler } from "../../controllers/asyncHandler";

const routerChallenge = Router();

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Gerenciamento de questões para os quizzes
 */

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Cria uma nova questão
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answer
 *               - correctResponse
 *               - points
 *             properties:
 *               answer:
 *                 type: string
 *                 example: Escolha a alternativa correta
 *               correctResponse:
 *                 type: string
 *                 example: print("Olá, mundo!")
 *               points:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Questão criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
routerChallenge.post("/", asyncHandler(createChallengeController));

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Lista todas as questões
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: Lista de questões retornada com sucesso
 */
routerChallenge.get("/", asyncHandler(getAllChallengeController));

/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: Busca uma questão pelo ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da questão
 *     responses:
 *       200:
 *         description: Questão encontrada
 *       404:
 *         description: Questão não encontrada
 */
routerChallenge.get("/:id", asyncHandler(getChallengeByIdController));

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     summary: Atualiza uma questão existente
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da questão
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answer:
 *                 type: string
 *               correctResponse:
 *                 type: string
 *               points:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Questão atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Questão não encontrada
 */
routerChallenge.put("/:id", asyncHandler(updateChallengeController));

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Remove uma questão existente
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da questão
 *     responses:
 *       200:
 *         description: Questão removida com sucesso
 *       404:
 *         description: Questão não encontrada
 */
routerChallenge.delete("/:id", asyncHandler(deleteChallengeController));

export default routerChallenge;
