import { Router } from 'express';
import usersRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';

const apiRoutes = Router();

apiRoutes.use('/users', usersRoutes);
apiRoutes.use('/auth', authRoutes);

export default apiRoutes;
