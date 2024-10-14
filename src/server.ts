import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import apiRoutes from './api.routes';
import shortUrlsRoutes from './routes/shorturls.routes';
import HttpBusinessError from './lib/errors/HttpBusinessError';
import docsRoutes from './docs.routes';

const PORT = process.env.PORT;
const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${new Date()} ${req.url}`);
  next();
});

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', docsRoutes);
app.use('/', shortUrlsRoutes);
app.use('/api', apiRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof HttpBusinessError) {
    return res.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
      context: error.context,
    });
  }

  res.status(500).json({
    message: 'Internal server error',
    statusCode: 500,
  });

  next(error);
});

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
