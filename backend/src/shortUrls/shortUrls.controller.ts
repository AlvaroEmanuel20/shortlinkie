import { Request, Response } from 'express';
import ShortUrlsService from './shortUrls.service';
import HttpBusinessError from '../utils/errors/HttpBusinessError';

export default class ShortUrlsController {
  async getShortUrl(req: Request, res: Response) {
    const shortUrlsService = new ShortUrlsService();
    const shortUrl = await shortUrlsService.getShortUrl(req.params.shortId);

    if (!shortUrl)
      throw new HttpBusinessError('Short Url not found', 404, 'shortUrls');

    res.json(shortUrl);
  }

  async getShortUrlWithSources(req: Request, res: Response) {
    const shortUrlsService = new ShortUrlsService();
    const shortUrlAndSources = await shortUrlsService.getShortUrlAndSources(
      req.params.shortId
    );

    if (!shortUrlAndSources)
      throw new HttpBusinessError('Short Url not found', 404, 'shortUrls');

    res.json(shortUrlAndSources);
  }

  async redirect(req: Request, res: Response) {
    const shortUrlsService = new ShortUrlsService();
    const { shortId } = req.params;
    const { src } = req.query as { src?: string };

    const result = await shortUrlsService.getShortUrl(shortId);

    if (!result)
      throw new HttpBusinessError('Short Url not found', 404, 'shortUrls');

    await shortUrlsService.increaseClicks(shortId, req.user.userId, src);
    res.redirect(result.originalUrl);
  }

  async create(req: Request, res: Response) {
    try {
      const shortUrlsService = new ShortUrlsService();

      const { shortId } = await shortUrlsService.createShortUrl(
        req.body,
        req.user.userId
      );

      res.status(201).json({ shortId });
    } catch (error) {
      throw new HttpBusinessError(
        'There is an shortUrl with this shortId',
        409,
        'shortUrls'
      );
    }
  }

  async update(req: Request, res: Response) {
    try {
      const shortUrlsService = new ShortUrlsService();

      const { shortId } = await shortUrlsService.updateShortUrl(
        req.body,
        req.params.shortId
      );

      res.json({ shortId });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const shortUrlsService = new ShortUrlsService();

      const { shortId } = await shortUrlsService.deleteShortUrl(
        req.params.shortId
      );

      res.json({ shortId });
    } catch (error) {
      console.log(error);
    }
  }
}
