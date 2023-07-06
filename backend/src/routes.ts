import { Router } from 'express';
import usersRoutes from './users/users.routes';

const routes = Router();

routes.use('/users', usersRoutes);

export default routes;
