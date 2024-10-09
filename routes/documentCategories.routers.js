import { Router } from "express";
import { DocCategoriesController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";

const docCategoriesRouter = new Router;

/**
 * @swagger
 * tags:
 *   name: Document Categories
 *   description: Document category management
 */

/**
 * @swagger
 * /document-categories:
 *   get:
 *     summary: Get all document categories
 *     tags: [Document Categories]
 *     responses:
 *       200:
 *         description: List of document categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 document_categories:
 *                   type: array
 *                   items:
 *                     type: object
 */

/**
 * @swagger
 * /document-categories:
 *   post:
 *     summary: Create a new document category
 *     tags: [Document Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Document category created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /document-categories/{id}:
 *   delete:
 *     summary: Delete a document category by ID
 *     tags: [Document Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the document category to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Document category deleted successfully
 *       404:
 *         description: Document category not found
 */

docCategoriesRouter.get('/document-categories', DocCategoriesController.getDocumentCategories);
docCategoriesRouter.post('/document-categories', checkAuth, handleValidationErrors, DocCategoriesController.createDocumentCategories);
docCategoriesRouter.delete('/document-categories/:id', checkAuth, DocCategoriesController.removeDocumentCategories);

export default docCategoriesRouter;