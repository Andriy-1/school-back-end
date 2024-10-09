import { Router } from "express";
import { PostCategoriesController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { postCategoriesCreateValidation } from "../validations.js";


const postCategoriesRouter = new Router;

/**
 * @swagger
 * tags:
 *   name: PostCategories
 *   description: Post categories management
 */

/**
 * @swagger
 * /posts-categories:
 *   get:
 *     summary: Get all post categories
 *     tags: [PostCategories]
 *     responses:
 *       200:
 *         description: List of post categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /posts-categories:
 *   post:
 *     summary: Create a new post category
 *     tags: [PostCategories]
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
 *       201:
 *         description: Post category created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /posts-categories/{id}:
 *   patch:
 *     summary: Update a post category by ID
 *     tags: [PostCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post category to update
 *         schema:
 *           type: integer
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
 *         description: Post category updated successfully
 *       404:
 *         description: Post category not found
 */

/**
 * @swagger
 * /posts-categories/{id}:
 *   delete:
 *     summary: Delete a post category by ID
 *     tags: [PostCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post category to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post category deleted successfully
 *       404:
 *         description: Post category not found
 */

postCategoriesRouter.get('/posts-categories', PostCategoriesController.getAll);
postCategoriesRouter.post('/posts-categories', checkAuth, postCategoriesCreateValidation, handleValidationErrors, PostCategoriesController.create);
postCategoriesRouter.patch('/posts-categories/:id', checkAuth, postCategoriesCreateValidation, handleValidationErrors, PostCategoriesController.update);
postCategoriesRouter.delete('/posts-categories/:id', checkAuth, PostCategoriesController.remove);



export default postCategoriesRouter;