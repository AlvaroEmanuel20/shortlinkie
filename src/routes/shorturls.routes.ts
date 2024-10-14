import { Router } from 'express';
import ShortUrlsController from '../controllers/shorturls.controller';
import isAuthenticated from '../middlewares/isAuthenticated';
import schemaValidator from '../middlewares/schemaValidator';
import {
  createShortUrlSchema,
  updateShortUrlSchema,
} from '../validations/shorturls.validations';

const shortUrlsRoutes = Router();
const shortUrlsController = new ShortUrlsController();

shortUrlsRoutes.get(
  '/shorturls',
  isAuthenticated,
  shortUrlsController.getAllShortUrl
);

shortUrlsRoutes.get(
  '/shorturls/:shortId',
  isAuthenticated,
  shortUrlsController.getShortUrl
);

shortUrlsRoutes.get(
  '/shorturls/total-clicks-by-src',
  isAuthenticated,
  shortUrlsController.getTotalClicksBySrc
);

shortUrlsRoutes.get(
  '/shorturls/clicks-by-src/:shortId',
  isAuthenticated,
  shortUrlsController.getClicksBySrcOfShortId
);

shortUrlsRoutes.get('/:shortId', shortUrlsController.redirect);

shortUrlsRoutes.post(
  '/shorturls',
  isAuthenticated,
  schemaValidator(createShortUrlSchema),
  shortUrlsController.create
);

shortUrlsRoutes.patch(
  '/shorturls/:shortId',
  isAuthenticated,
  schemaValidator(updateShortUrlSchema),
  shortUrlsController.update
);

shortUrlsRoutes.delete(
  '/shorturls/:shortId',
  isAuthenticated,
  shortUrlsController.delete
);

export default shortUrlsRoutes;
