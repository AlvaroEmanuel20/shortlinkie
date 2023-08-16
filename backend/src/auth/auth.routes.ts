import { Router } from 'express';
import AuthController from './auth.controller';
import validate from '../middlewares/validate';
import { loginSchema } from './auth.validations';
import isAuthenticated from '../middlewares/isAuthenticated';

const authRoutes = Router();
const authController = new AuthController();

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     LoginData:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         email: alvaro@gmail.com
 *         password: test1234
 *     LoginResponse:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         accessToken:
 *           type: string
 *       example:
 *         userId: 123e4567-e89b-12d3-a456-426614174000
 *         accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *     LogoutResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *       example:
 *         success: true
 *
 * tags: Auth
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginData'
 *     responses:
 *       200:
 *         description: Login response object and set accessToken cookie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: accessToken=teste; HttpOnly
 *       401:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 401
 *                 message: Invalid password
 *                 context: auth
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 404
 *                 message: User not found
 *                 context: auth
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: auth
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout endpoint
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutResponse'
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: auth
 */
authRoutes.post('/login', validate(loginSchema), authController.login);
authRoutes.post('/logout', isAuthenticated, authController.logout);

export default authRoutes;
