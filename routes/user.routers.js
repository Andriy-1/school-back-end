import { Router } from "express";
import { UserController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { userCreateValidation } from "../validations.js";


const userRouter = new Router;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /about/user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   fullName:
 *                     type: string
 *                   position:
 *                     type: string
 *                   description:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 */

/**
 * @swagger
 * /about/user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               position:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /about/user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

userRouter.get('/about/user', UserController.getAllUsers);
userRouter.post('/about/user', checkAuth, userCreateValidation, handleValidationErrors, UserController.createUser);
userRouter.delete('/about/user/:id', checkAuth, UserController.removeUsers);

export default userRouter;

