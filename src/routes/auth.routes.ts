import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import schemaValidator from '../middlewares/schemaValidator';
import { loginSchema } from '../validations/auth.validations';
import isAuthenticated from '../middlewares/isAuthenticated';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/login', schemaValidator(loginSchema), authController.login);
authRoutes.post('/logout', isAuthenticated, authController.logout);

export default authRoutes;
