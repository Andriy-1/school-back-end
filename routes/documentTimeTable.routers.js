import { Router } from "express";
import {DocTimeTableController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";


const docTimeTableRouter = new Router;

/**
 * @swagger
 * tags:
 *   name: Document Timetable
 *   description: Document timetable management
 */

/**
 * @swagger
 * /timetable:
 *   get:
 *     summary: Get all documents from the timetable
 *     tags: [Document Timetable]
 *     responses:
 *       200:
 *         description: List of documents in the timetable
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /timetable:
 *   post:
 *     summary: Upload a document to the timetable
 *     tags: [Document Timetable]
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
 *               seniors:
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
 * /timetable/{id}:
 *   delete:
 *     summary: Delete a document from the timetable by ID
 *     tags: [Document Timetable]
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

docTimeTableRouter.get('/timetable', DocTimeTableController.getAllDoc);
docTimeTableRouter.post('/timetable', checkAuth, handleValidationErrors, DocTimeTableController.createDoc);
docTimeTableRouter.delete('/timetable/:id', checkAuth, DocTimeTableController.removeDoc);

export default docTimeTableRouter;
