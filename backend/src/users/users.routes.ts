import { Router } from 'express';
import UsersController from './users.controller';
import isAuthenticated from '../middlewares/isAuthenticated';

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get('/', isAuthenticated, usersController.getUser);
usersRoutes.post('/', usersController.create);
usersRoutes.patch('/', isAuthenticated, usersController.update);
usersRoutes.delete('/', isAuthenticated, usersController.delete);

export default usersRoutes;
