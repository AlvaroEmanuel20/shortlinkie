import { Router } from 'express';
import ShortUrlsController from './shortUrls.controller';

const shortUrlsRoutes = Router();
const shortUrlsController = new ShortUrlsController();

shortUrlsRoutes.get('/details/:shortId', shortUrlsController.getShortUrl);
shortUrlsRoutes.get('/:shortId', shortUrlsController.redirect);
shortUrlsRoutes.post('/', shortUrlsController.create);
shortUrlsRoutes.patch('/:shortId', shortUrlsController.update);
shortUrlsRoutes.delete('/:shortId', shortUrlsController.delete);

export default shortUrlsRoutes;
