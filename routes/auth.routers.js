import { Router } from "express";
import { AuthController } from "../controllers/index.js";
import { checkAuth, handleValidationErrors } from "../utils/index.js";
import { loginValidation, registerValidation } from "../validations.js";


const authRouter = new Router;


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user info
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Current user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 fullName:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 id:
 *                   type: integer
 *                 fullName:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               key:
 *                 type: string
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - key
 *     responses:
 *       201:
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 auth:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     fullName:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *       406:
 *         description: Invalid input
 */

authRouter.post('/auth/login', loginValidation, handleValidationErrors, AuthController.login);
authRouter.post('/auth/register', registerValidation, handleValidationErrors, AuthController.register);
authRouter.get('/auth/me', checkAuth, AuthController.getMe);

export default authRouter;