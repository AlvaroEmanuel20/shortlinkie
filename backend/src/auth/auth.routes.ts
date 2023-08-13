import { Router } from 'express';
import AuthController from './auth.controller';
import validate from '../middlewares/validate';
import { loginSchema } from './auth.validations';
import isAuthenticated from '../middlewares/isAuthenticated';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/login', validate(loginSchema), authController.login);
authRoutes.post('/logout', isAuthenticated, authController.logout);

export default authRoutes;
