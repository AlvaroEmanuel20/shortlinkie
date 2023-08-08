import { Router } from 'express';
import usersRoutes from './users/users.routes';
import authRoutes from './auth/auth.routes';

const apiRoutes = Router();

apiRoutes.use('/users', usersRoutes);
apiRoutes.use('/auth', authRoutes);

export default apiRoutes;
