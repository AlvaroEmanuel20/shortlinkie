import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import errors from './middlewares/errors';
import logger from './middlewares/logger';
import apiRoutes from './api.routes';
import shortUrlsRoutes from './shortUrls/shortUrls.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './utils/swagger';

const { PORT, FRONT_URL } = process.env;
const app = express();

app.use(logger);
app.use(cookieParser());
app.use(cors({ origin: FRONT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: number
 *         message:
 *           type: string
 *         context:
 *           type: string
 *           description: Error context in API
 */

app.use('/', shortUrlsRoutes);
app.use('/api', apiRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errors);

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
