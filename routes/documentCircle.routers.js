import { Router } from "express";
import {DocCircleController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";


const docCircleRouter = new Router;

/**
 * @swagger
 * tags:
 *   name: Document Circle
 *   description: Document circle management
 */

/**
 * @swagger
 * /circle:
 *   get:
 *     summary: Get all documents from the circle
 *     tags: [Document Circle]
 *     responses:
 *       200:
 *         description: List of documents in the circle
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /circle:
 *   post:
 *     summary: Upload a document to the circle
 *     tags: [Document Circle]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Document uploaded successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /circle/{id}:
 *   delete:
 *     summary: Delete a document from the circle by ID
 *     tags: [Document Circle]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the document to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Document deleted successfully
 *       404:
 *         description: Document not found
 */

docCircleRouter.get('/circle', DocCircleController.getAllDoc);
docCircleRouter.post('/circle', checkAuth, handleValidationErrors, DocCircleController.createDoc);
docCircleRouter.delete('/circle/:id', checkAuth, DocCircleController.removeDoc);

export default docCircleRouter;
