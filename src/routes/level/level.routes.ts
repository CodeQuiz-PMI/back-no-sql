import { Router } from "express";
import {
  createLevelController,
  deleteLevelController,
  getAllLevelController,
  getLevelByIdController,
  updateLevelController,
} from "../../controllers";
import { asyncHandler } from "../../controllers/asyncHandler";

const routerLevel = Router();

/**
 * @swagger
 * tags:
 *   name: Levels
 *   description: Gerenciamento de níveis do jogo
 */

/**
 * @swagger
 * /levels:
 *   post:
 *     summary: Cria um novo nível
 *     tags: [Levels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - difficulty
 *             properties:
 *               title:
 *                 type: string
 *                 example: Nível 1
 *               description:
 *                 type: string
 *                 example: Introdução à lógica de programação
 *               difficulty:
 *                 type: string
 *                 example: fácil
 *     responses:
 *       201:
 *         description: Nível criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
routerLevel.post("/", asyncHandler(createLevelController));

/**
 * @swagger
 * /levels:
 *   get:
 *     summary: Lista todos os níveis
 *     tags: [Levels]
 *     responses:
 *       200:
 *         description: Lista de níveis
 */
routerLevel.get("/", asyncHandler(getAllLevelController));

/**
 * @swagger
 * /levels/{id}:
 *   get:
 *     summary: Busca um nível pelo ID
 *     tags: [Levels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do nível
 *     responses:
 *       200:
 *         description: Nível encontrado
 *       404:
 *         description: Nível não encontrado
 */
routerLevel.get("/:id", asyncHandler(getLevelByIdController));

/**
 * @swagger
 * /levels/{id}:
 *   put:
 *     summary: Atualiza um nível existente
 *     tags: [Levels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do nível
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Nível Atualizado
 *               description:
 *                 type: string
 *                 example: Nova descrição do nível
 *               difficulty:
 *                 type: string
 *                 example: médio
 *     responses:
 *       200:
 *         description: Nível atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Nível não encontrado
 */
routerLevel.put("/:id", asyncHandler(updateLevelController));

/**
 * @swagger
 * /levels/{id}:
 *   delete:
 *     summary: Remove um nível existente
 *     tags: [Levels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do nível
 *     responses:
 *       200:
 *         description: Nível removido com sucesso
 *       404:
 *         description: Nível não encontrado
 */
routerLevel.delete("/:id", asyncHandler(deleteLevelController));

export default routerLevel;
