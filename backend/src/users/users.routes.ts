import { Router } from 'express';
import UsersController from './users.controller';

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get('/', usersController.getUser);
usersRoutes.post('/', usersController.create);
usersRoutes.patch('/', usersController.update);
usersRoutes.delete('/', usersController.delete);

export default usersRoutes;
