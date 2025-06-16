import { Router } from "express";
import {
  createSectionController,
  deleteSectionController,
  getAllSectionController,
  getSectionByIdController,
  updateSectionController,
} from "../../controllers";
import { asyncHandler } from "../../controllers/asyncHandler";

const routerSection = Router();

/**
 * @swagger
 * tags:
 *   name: Sections
 *   description: Gerenciamento de seções dos níveis
 */

/**
 * @swagger
 * /sections:
 *   post:
 *     summary: Cria uma nova seção
 *     tags: [Sections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - level
 *             properties:
 *               title:
 *                 type: string
 *                 example: Seção 1
 *               description:
 *                 type: string
 *                 example: Introdução à lógica booleana
 *               level:
 *                 type: string
 *                 example: 665bcef3db56a78ef78abc22
 *     responses:
 *       201:
 *         description: Seção criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
routerSection.post("/", asyncHandler(createSectionController));

/**
 * @swagger
 * /sections:
 *   get:
 *     summary: Lista todas as seções
 *     tags: [Sections]
 *     responses:
 *       200:
 *         description: Lista de seções retornada com sucesso
 */
routerSection.get("/", asyncHandler(getAllSectionController));

/**
 * @swagger
 * /sections/{id}:
 *   get:
 *     summary: Busca uma seção pelo ID
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da seção
 *     responses:
 *       200:
 *         description: Seção encontrada
 *       404:
 *         description: Seção não encontrada
 */
routerSection.get("/:id", asyncHandler(getSectionByIdController));

/**
 * @swagger
 * /sections/{id}:
 *   put:
 *     summary: Atualiza uma seção existente
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da seção
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Seção Atualizada
 *               description:
 *                 type: string
 *                 example: Conteúdo atualizado da seção
 *               level:
 *                 type: string
 *                 example: 665bcef3db56a78ef78abc22
 *     responses:
 *       200:
 *         description: Seção atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Seção não encontrada
 */
routerSection.put("/:id", asyncHandler(updateSectionController));

/**
 * @swagger
 * /sections/{id}:
 *   delete:
 *     summary: Remove uma seção existente
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da seção
 *     responses:
 *       200:
 *         description: Seção removida com sucesso
 *       404:
 *         description: Seção não encontrada
 */
routerSection.delete("/:id", asyncHandler(deleteSectionController));

export default routerSection;
