import { Router } from 'express';
import usersRoutes from './users/users.routes';
import authRoutes from './auth/auth.routes';
import qrCodeConfigRoutes from './qrCodeConfigs/qrCodeConfig.routes';

const apiRoutes = Router();

apiRoutes.use('/users', usersRoutes);
apiRoutes.use('/qrconfig', qrCodeConfigRoutes);
apiRoutes.use('/auth', authRoutes);

export default apiRoutes;
