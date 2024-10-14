import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import isAuthenticated from '../middlewares/isAuthenticated';
import schemaValidator from '../middlewares/schemaValidator';
import {
  confirmResetPassSchema,
  createUserSchema,
  resetPassSchema,
  updateUserSchema,
} from '../validations/users.validations';

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get('/', isAuthenticated, usersController.getUser);

usersRoutes.post(
  '/',
  schemaValidator(createUserSchema),
  usersController.create
);

usersRoutes.get('/verify', usersController.verify);

usersRoutes.post('/new-verify', isAuthenticated, usersController.newVerify);

usersRoutes.post(
  '/reset-pass',
  schemaValidator(resetPassSchema),
  usersController.resetPass
);

usersRoutes.put(
  '/reset-pass',
  schemaValidator(confirmResetPassSchema),
  usersController.confirmResetPass
);

usersRoutes.patch(
  '/',
  schemaValidator(updateUserSchema),
  isAuthenticated,
  usersController.update
);

usersRoutes.delete('/', isAuthenticated, usersController.delete);

export default usersRoutes;
