import { Router } from 'express';
import AuthController from './auth.controller';
import validate from '../middlewares/validate';
import { loginSchema } from './auth.validations';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/login', validate(loginSchema), authController.login);

export default authRoutes;
