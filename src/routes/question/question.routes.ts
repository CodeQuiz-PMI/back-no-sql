import { Router } from "express";
import {
  createQuestionController,
  deleteQuestionController,
  getAllQuestionController,
  getQuestionByIdController,
  updateQuestionController,
} from "../../controllers";
import { asyncHandler } from "../../controllers/asyncHandler";

const routerQuestion = Router();

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
 *               - title
 *               - text
 *               - answer
 *               - correctResponse
 *               - type
 *               - order
 *               - points
 *               - section
 *             properties:
 *               title:
 *                 type: string
 *                 example: Sintaxe correta de print em Python
 *               text:
 *                 type: string
 *                 example: Qual é a forma correta de imprimir texto na tela usando Python?
 *               answer:
 *                 type: string
 *                 example: Escolha a alternativa correta
 *               correctResponse:
 *                 type: string
 *                 example: print("Olá, mundo!")
 *               type:
 *                 type: string
 *                 example: múltipla-escolha
 *               order:
 *                 type: integer
 *                 example: 1
 *               points:
 *                 type: integer
 *                 example: 10
 *               section:
 *                 type: string
 *                 example: 665bd25e9c2b34e2aab71f05
 *     responses:
 *       201:
 *         description: Questão criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
routerQuestion.post("/", asyncHandler(createQuestionController));

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
routerQuestion.get("/", asyncHandler(getAllQuestionController));

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
routerQuestion.get("/:id", asyncHandler(getQuestionByIdController));

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
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *               answer:
 *                 type: string
 *               correctResponse:
 *                 type: string
 *               type:
 *                 type: string
 *               order:
 *                 type: integer
 *               points:
 *                 type: integer
 *               section:
 *                 type: string
 *     responses:
 *       200:
 *         description: Questão atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Questão não encontrada
 */
routerQuestion.put("/:id", asyncHandler(updateQuestionController));

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
routerQuestion.delete("/:id", asyncHandler(deleteQuestionController));

export default routerQuestion;
