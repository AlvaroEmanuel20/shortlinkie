import { Request, Response } from 'express';
import ShortUrlsService from './shortUrls.service';
import HttpBusinessError from '../utils/errors/HttpBusinessError';
import { Prisma } from '@prisma/client';
import CustomBusinessError from '../utils/errors/CustomBusinessError';

interface SourcesQuery {
  sources?: boolean;
}

export default class ShortUrlsController {
  async getAllShortUrl(req: Request, res: Response) {
    const shortUrlsService = new ShortUrlsService();
    const { sources } = req.query as SourcesQuery;
    const shortUrls = await shortUrlsService.getAllShortUrls(
      req.user.userId,
      sources
    );

    res.json(shortUrls);
  }

  async getShortUrl(req: Request, res: Response) {
    const shortUrlsService = new ShortUrlsService();
    const { sources } = req.query as SourcesQuery;
    const shortUrl = await shortUrlsService.getShortUrl(
      req.params.shortId,
      sources
    );

    if (!shortUrl)
      throw new HttpBusinessError('Short Url not found', 404, 'shortUrls');

    res.json(shortUrl);
  }

  async getTotalClicksAndUrls(req: Request, res: Response) {
    const shortUrlsService = new ShortUrlsService();
    const result = await shortUrlsService.totalClicksAndUrls(req.user.userId);
    res.json(result);
  }

  async redirect(req: Request, res: Response) {
    try {
      const shortUrlsService = new ShortUrlsService();
      const { shortId } = req.params;
      const { src } = req.query as { src?: string };

      const result = await shortUrlsService.getShortUrl(shortId);

      if (!result)
        throw new HttpBusinessError('Short Url not found', 404, 'shortUrls');

      await shortUrlsService.increaseClicks(shortId, src);
      res.redirect(result.originalUrl);
    } catch (error) {
      if (error instanceof CustomBusinessError) {
        throw new HttpBusinessError(error.message, 404, 'shortUrls');
      }
    }
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpBusinessError(
            'There is an short url with this shortId',
            409,
            'shortUrls'
          );
        } else {
          throw new HttpBusinessError('Short Url not found', 404, 'shortUrls');
        }
      }
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
      throw new HttpBusinessError('Short Url not found', 404, 'shortUrls');
    }
  }
}
