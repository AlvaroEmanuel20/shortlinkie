import { Request, Response } from 'express';
import ShortUrlsService from '../services/shorturls.service';
import HttpBusinessError from '../lib/errors/HttpBusinessError';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

type RedirectQuery = {
  src?: string;
};

export default class ShortUrlsController {
  async getAllShortUrl(req: Request, res: Response) {
    const shortUrlsService = new ShortUrlsService();
    const shortUrls = await shortUrlsService.getAllShortUrls(req.user.userId);
    res.json(shortUrls);
  }

  async getShortUrl(req: Request, res: Response) {
    const shortUrlsService = new ShortUrlsService();
    const shortUrl = await shortUrlsService.getShortUrl(req.params.shortId);

    if (!shortUrl)
      throw new HttpBusinessError('Short Url not found', 404, 'shorturls');

    res.json(shortUrl);
  }

  async getTotalClicksBySrc(req: Request, res: Response) {
    const shortUrlsService = new ShortUrlsService();
    res.json(await shortUrlsService.countTotalClicksBySrc(req.user.userId));
  }

  async getClicksBySrcOfShortId(req: Request, res: Response) {
    const shortUrlsService = new ShortUrlsService();
    res.json(
      await shortUrlsService.countClicksBySrcOfShortId(req.params.shortId)
    );
  }

  async redirect(req: Request, res: Response) {
    try {
      const shortUrlsService = new ShortUrlsService();
      const { src } = req.query as RedirectQuery;

      const result = await shortUrlsService.redirect(
        req.params.shortId,
        src,
      );

      res.redirect(result.originalUrl);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new HttpBusinessError('Short URL not found', 404, 'shorturls');
      }
    }
  }

  async create(req: Request, res: Response) {
    const shortUrlsService = new ShortUrlsService();
    const { shortId } = await shortUrlsService.createShortUrl(
      req.body,
      req.user.userId
    );

    res.status(201).json({ shortId });
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
            'shorturls'
          );
        }

        if (error.code === 'P2025') {
          throw new HttpBusinessError('Short Url not found', 404, 'shorturls');
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
      throw new HttpBusinessError('Short Url not found', 404, 'shorturls');
    }
  }
}
