import { Router } from "express";
import { GalleryController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";


const galleryRouter = new Router;

/**
 * @swagger
 * tags:
 *   name: Gallery
 *   description: Gallery management
 */

/**
 * @swagger
 * /gallery:
 *   get:
 *     summary: Get all images from the gallery
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: List of images in the gallery
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 file:
 *                   type: array
 *                   items:
 *                     type: object
 *                 paginationCount:
 *                   type: integer
 */

/**
 * @swagger
 * /gallery:
 *   post:
 *     summary: Upload images to the gallery
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /gallery/{id}:
 *   delete:
 *     summary: Delete an image from the gallery by ID
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the image to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *       404:
 *         description: Image not found
 */

galleryRouter.get('/gallery', GalleryController.getAll);
galleryRouter.post('/gallery', checkAuth, handleValidationErrors, GalleryController.create);
galleryRouter.delete('/gallery/:id', checkAuth, GalleryController.remove);

export default galleryRouter;
