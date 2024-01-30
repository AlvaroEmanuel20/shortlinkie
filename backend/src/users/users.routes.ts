import { Router } from 'express';
import UsersController from './users.controller';
import isAuthenticated from '../middlewares/isAuthenticated';
import validate from '../middlewares/validate';
import {
  confirmResetPassSchema,
  createUserSchema,
  resetPassSchema,
  updateUserSchema,
} from './users.validations';
import upload from '../utils/upload';

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
 *         isVerified:
 *           type: boolean
 *       example:
 *         userId: 123e4567-e89b-12d3-a456-426614174000
 *         name: Álvaro Emanuel
 *         email: alvaro@gmail.com
 *         avatarUrl: https://example.com/image.png
 *         isVerified: true
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
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get user details
 *     security:
 *       - cookieAuth: []
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
 *     summary: Create new user and send verification email
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
 *     security:
 *       - cookieAuth: []
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
 *     security:
 *       - cookieAuth: []
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
 * /api/users/verify:
 *   get:
 *     tags: [Users]
 *     summary: Verify user
 *     parameters:
 *       - in: query
 *         name: token
 *         type: string
 *         required: true
 *         description: Verification token
 *     responses:
 *       302:
 *         description: Redirect to dashboard if token valid
 *       403:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 403
 *                 message: Invalid verification token
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
 * /api/users/newverify:
 *   post:
 *     tags: [Users]
 *     summary: Generate new verification token/email
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserId'
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: users
 * /api/users/resetpass:
 *   post:
 *     tags: [Users]
 *     summary: Generate a resetpass request and email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
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
 *   get:
 *     tags: [Users]
 *     summary: Verify resetpass token and redirect to reset pass front
 *     parameters:
 *       - in: query
 *         name: token
 *         type: string
 *         required: true
 *         description: Reset pass token
 *     responses:
 *       302:
 *         description: Redirect to reset pass form if token valid
 *       403:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 403
 *                 message: Invalid verification token
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
 *   put:
 *     tags: [Users]
 *     summary: Update and reset pass
 *     parameters:
 *       - in: query
 *         name: token
 *         type: string
 *         required: true
 *         description: Reset pass token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserId'
 *       403:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 403
 *                 message: Invalid token
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

//SIGN UP AND VERIFY USER
usersRoutes.post('/', validate(createUserSchema), usersController.create);
usersRoutes.get('/verify', usersController.verify);
usersRoutes.post('/newverify', isAuthenticated, usersController.newVerify);
//SIGN UP AND VERIFY USER

//RESET PASS
usersRoutes.post(
  '/resetpass',
  validate(resetPassSchema),
  usersController.resetPass
);
usersRoutes.get('/resetpass', usersController.verifyResetPass);
usersRoutes.put(
  '/resetpass',
  validate(confirmResetPassSchema),
  usersController.confirmResetPass
);
//RESET PASS

usersRoutes.patch(
  '/',
  validate(updateUserSchema),
  isAuthenticated,
  usersController.update
);
usersRoutes.delete('/', isAuthenticated, usersController.delete);

//UPLOAD AVATAR
usersRoutes.put(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersController.uploadAvatar
);
//UPLOAD AVATAR

export default usersRoutes;
