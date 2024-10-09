import { Router } from "express";
import { DocController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";


const docRouter = new Router;

/**
 * @swagger
 * tags:
 *   name: Document
 *   description: Document management
 */

/**
 * @swagger
 * /document:
 *   get:
 *     summary: Get all documents
 *     tags: [Document]
 *     parameters:
 *       - name: categories_id
 *         in: query
 *         required: false
 *         description: Filter documents by category ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of documents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 document:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       file:
 *                         type: string
 *                       categories_id:
 *                         type: integer
 */

/**
 * @swagger
 * /document:
 *   post:
 *     summary: Create a new document
 *     tags: [Document]
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
 *               categories_id:
 *                 type: integer
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Document created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /document/{id}:
 *   patch:
 *     summary: Update a document
 *     tags: [Document]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the document to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categories_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Document updated successfully
 *       404:
 *         description: Document not found
 */

/**
 * @swagger
 * /document/{id}:
 *   delete:
 *     summary: Delete a document
 *     tags: [Document]
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

docRouter.get('/document', DocController.getAllDoc);
docRouter.post('/document', checkAuth, handleValidationErrors, DocController.createDoc);
docRouter.patch('/document/:id', checkAuth, handleValidationErrors, DocController.updateDoc);
docRouter.delete('/document/:id', checkAuth, DocController.removeDoc);

export default docRouter;
