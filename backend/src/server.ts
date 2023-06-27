import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import 'dotenv/config';
import Database from './config/Database';
import errors from './middlewares/errors';
import logger from './middlewares/logger';

const { PORT } = process.env;
const app = express();
const database = new Database();

database.connect();
app.use(logger);
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errors);

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
