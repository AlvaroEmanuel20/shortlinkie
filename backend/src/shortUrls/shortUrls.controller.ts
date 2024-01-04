import { Request, Response } from 'express';
import ShortUrlsService from './shortUrls.service';
import HttpBusinessError from '../utils/errors/HttpBusinessError';
import { Prisma } from '@prisma/client';
import CustomBusinessError from '../utils/errors/CustomBusinessError';

type RedirectQuery = {
  qrcode?: boolean;
  src?: string;
};

type DateRangeQuery = {
  fromDate?: Date;
  toDate?: Date;
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

  async getClicksBySrcOfShortId(req: Request, res: Response) {
    const shortUrlsService = new ShortUrlsService();
    res.json(
      await shortUrlsService.countClicksBySrcOfShortId(req.params.shortId)
    );
  }

  async getQrcodeClicksOfShortId(req: Request, res: Response) {
    const shortUrlsService = new ShortUrlsService();
    res.json(
      await shortUrlsService.countQrcodeClicksOfShortId(req.params.shortId)
    );
  }

  async getTotalClicksBySrc(req: Request, res: Response) {
    const shortUrlsService = new ShortUrlsService();
    res.json(await shortUrlsService.countTotalClicksBySrc(req.user.userId));
  }

  async getTotalClicksByDateRange(req: Request, res: Response) {
    const shortUrlsService = new ShortUrlsService();
    const { fromDate, toDate } = req.query as DateRangeQuery;
    res.json(
      await shortUrlsService.countTotalClicksByDateRange(
        req.user.userId,
        fromDate,
        toDate
      )
    );
  }

  async redirect(req: Request, res: Response) {
    try {
      const shortUrlsService = new ShortUrlsService();
      const { qrcode, src } = req.query as RedirectQuery;
      const result = await shortUrlsService.getShortUrl(req.params.shortId);

      if (!result)
        throw new HttpBusinessError('Short Url not found', 404, 'shorturls');

      await shortUrlsService.createClick(result.shortId, src, qrcode);
      res.redirect(result.originalUrl);
    } catch (error) {
      if (error instanceof CustomBusinessError) {
        throw new HttpBusinessError(error.message, 404, 'shorturls');
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
      //empty
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
            'shorturls'
          );
        } else {
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
