import { Router } from 'express';
import ShortUrlsController from './shortUrls.controller';
import isAuthenticated from '../middlewares/isAuthenticated';

const shortUrlsRoutes = Router();
const shortUrlsController = new ShortUrlsController();

shortUrlsRoutes.get(
  '/details/:shortId',
  isAuthenticated,
  shortUrlsController.getShortUrl
);
shortUrlsRoutes.get('/:shortId', isAuthenticated, shortUrlsController.redirect);
shortUrlsRoutes.post('/', isAuthenticated, shortUrlsController.create);
shortUrlsRoutes.patch('/:shortId', isAuthenticated, shortUrlsController.update);
shortUrlsRoutes.delete(
  '/:shortId',
  isAuthenticated,
  shortUrlsController.delete
);

export default shortUrlsRoutes;
