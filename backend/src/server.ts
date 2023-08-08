import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import 'dotenv/config';
import errors from './middlewares/errors';
import logger from './middlewares/logger';
import apiRoutes from './api.routes';
import shortUrlsRoutes from './shortUrls/shortUrls.routes';

const { PORT } = process.env;
const app = express();

app.use(logger);
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', shortUrlsRoutes);
app.use('/api', apiRoutes);

app.use(errors);

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
