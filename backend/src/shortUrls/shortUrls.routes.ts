import { Router } from 'express';
import ShortUrlsController from './shortUrls.controller';
import isAuthenticated from '../middlewares/isAuthenticated';
import validate from '../middlewares/validate';
import {
  createShortUrlSchema,
  updateShortUrlSchema,
} from './shortUrls.validations';

const shortUrlsRoutes = Router();
const shortUrlsController = new ShortUrlsController();

shortUrlsRoutes.get(
  '/details/:shortId',
  isAuthenticated,
  shortUrlsController.getShortUrl
);

shortUrlsRoutes.get('/:shortId', shortUrlsController.redirect);

shortUrlsRoutes.post(
  '/',
  isAuthenticated,
  validate(createShortUrlSchema),
  shortUrlsController.create
);

shortUrlsRoutes.patch(
  '/:shortId',
  isAuthenticated,
  validate(updateShortUrlSchema),
  shortUrlsController.update
);

shortUrlsRoutes.delete(
  '/:shortId',
  isAuthenticated,
  shortUrlsController.delete
);

export default shortUrlsRoutes;
