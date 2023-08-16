import { Router } from 'express';
import UsersController from './users.controller';
import isAuthenticated from '../middlewares/isAuthenticated';
import validate from '../middlewares/validate';
import { createUserSchema, updateUserSchema } from './users.validations';

const usersRoutes = Router();
const usersController = new UsersController();

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         avatarUrl:
 *           type: string
 *       example:
 *         userId: 123e4567-e89b-12d3-a456-426614174000
 *         name: Álvaro Emanuel
 *         email: alvaro@gmail.com
 *         avatarUrl: https://example.com/image.png
 *     UserId:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *       example:
 *         userId: 123e4567-e89b-12d3-a456-426614174000
 *     CreateUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         avatarUrl:
 *           type: string
 *       example:
 *         name: Álvaro Emanuel
 *         email: alvaro@gmail.com
 *         password: test1234
 *     UpdateUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         avatarUrl:
 *           type: string
 *       example:
 *         name: Álvaro
 *
 * tags: Users
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get user details
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 404
 *                 message: User not found
 *                 context: users
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: users
 *   post:
 *     tags: [Users]
 *     summary: Create new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserId'
 *       409:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 409
 *                 message: There is an user with this email
 *                 context: users
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: users
 *   patch:
 *     tags: [Users]
 *     summary: Update a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserId'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 404
 *                 message: User not found
 *                 context: users
 *       409:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 409
 *                 message: There is an user with this email
 *                 context: users
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: users
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserId'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 404
 *                 message: User not found
 *                 context: users
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: users
 */

usersRoutes.get('/', isAuthenticated, usersController.getUser);
usersRoutes.post('/', validate(createUserSchema), usersController.create);
usersRoutes.patch(
  '/',
  validate(updateUserSchema),
  isAuthenticated,
  usersController.update
);
usersRoutes.delete('/', isAuthenticated, usersController.delete);

export default usersRoutes;
