import { Router } from 'express';
import UsersController from './users.controller';
import isAuthenticated from '../middlewares/isAuthenticated';
import validate from '../middlewares/validate';
import { createUserSchema, updateUserSchema } from './users.validations';

const usersRoutes = Router();
const usersController = new UsersController();

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
