import { Router } from "express";
import { PostController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { postCreateValidation } from "../validations.js";


const postRouter = new Router;

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Post management
 */

/**
 * @swagger
 * /posts-from-category:
 *   get:
 *     summary: Отримати всі публікації з певної категорії
 *     tags: [Post]
 *     parameters:
 *       - name: categories_id
 *         in: query
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of posts from the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: List of all posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier for the post
 *                   title:
 *                     type: string
 *                     description: The title of the post
 *                   text:
 *                     type: string
 *                     description: The content of the post
 *                   viewsCount:
 *                     type: integer
 *                     description: The number of views for the post
 *                   likeCount:
 *                     type: integer
 *                     description: The number of likes for the post
 *                   user_id:
 *                     type: integer
 *                     description: The ID of the user who created the post
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the post was created
 *                   postCategories_id:
 *                     type: integer
 *                     description: The ID of the category for the post
 *                   imageUrl:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: The URL of the image associated with the post
 *                   published:
 *                     type: boolean
 *                     description: Whether the post is published or not
 */

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a single post by ID
 *     tags: [Post]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post details
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /posts/three:
 *   get:
 *     summary: Get three latest posts
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: List of three latest posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
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
 *                 description: The title of the post
 *               text:
 *                 type: string
 *                 description: The content of the post
 *               postCategories_id:
 *                 type: integer
 *                 description: The ID of the category for the post
 *               published:
 *                 type: boolean
 *                 description: Whether the post is published or not
 *               imageUrl:
 *                 type: string
 *                 description: The URL of the image associated with the post
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /posts/{id}:
 *   patch:
 *     summary: Update a post by ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post to update
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
 *               text:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /posts/likes/{id}:
 *   patch:
 *     summary: Update like count for a post
 *     tags: [Post]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isLiked:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Like count updated successfully
 */

/**
 * @swagger
 * /posts/views/{id}:
 *   patch:
 *     summary: Update views count for a post
 *     tags: [Post]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isViews:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Views count updated successfully
 */

postRouter.get('/posts-from-category', PostController.getFromCategoryAll);
postRouter.get('/posts', PostController.getAll);
postRouter.get('/posts/:id', PostController.getOne);
postRouter.get('/posts/three', PostController.getThree);
postRouter.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
postRouter.delete('/posts/:id', checkAuth, PostController.remove);
postRouter.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
postRouter.patch('/posts/likes/:id', PostController.updateLikeCount)
postRouter.patch('/posts/views/:id', PostController.updateViewsCount)


export default postRouter;