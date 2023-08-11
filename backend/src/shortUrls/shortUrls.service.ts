import { nanoid } from 'nanoid';
import prisma from '../utils/prisma';
import { CreateShortUrlData, UpdateShortUrlData } from './shortUrls.interfaces';
import CustomBusinessError from '../utils/errors/CustomBusinessError';

export default class ShortUrlsService {
  async getAllShortUrls(userId: string, sources?: boolean) {
    if (sources)
      return await prisma.shortUrl.findMany({
        where: { userId },
        include: {
          Source: {
            select: {
              name: true,
              clicks: true,
            },
          },
        },
      });

    return await prisma.shortUrl.findMany({ where: { userId } });
  }

  async getShortUrl(shortId: string, sources?: boolean) {
    if (sources)
      return await prisma.shortUrl.findUnique({
        where: { shortId },
        include: {
          Source: {
            select: {
              name: true,
              clicks: true,
            },
          },
        },
      });

    return await prisma.shortUrl.findUnique({ where: { shortId } });
  }

  async createShortUrl(data: CreateShortUrlData, userId: string) {
    const shortUrl = await prisma.shortUrl.create({
      data: {
        title: data.title,
        originalUrl: data.originalUrl,
        shortId: nanoid(10),
        userId,
      },
    });

    return { shortId: shortUrl.shortId };
  }

  async increaseClicks(shortId: string, src?: string) {
    const shortUrl = await prisma.shortUrl.findUnique({ where: { shortId } });
    if (!shortUrl)
      throw new CustomBusinessError('Short Url not found', 'shortUrls');

    if (src) {
      const sourceExists = await prisma.source.findUnique({
        where: { name: src },
      });

      if (!sourceExists)
        await prisma.source.create({
          data: { name: src, shortId, userId: shortUrl.userId },
        });

      await prisma.source.update({
        where: { name: src },
        data: {
          clicks: { increment: 1 },
        },
      });
    }

    await prisma.shortUrl.update({
      where: { shortId },
      data: {
        clicks: { increment: 1 },
      },
    });
  }

  async updateShortUrl(data: UpdateShortUrlData, shortId: string) {
    await prisma.shortUrl.update({
      where: { shortId },
      data: { ...data },
    });

    return { shortId };
  }

  async deleteShortUrl(shortId: string) {
    await prisma.source.deleteMany({ where: { shortId } });
    await prisma.shortUrl.delete({ where: { shortId } });
    return { shortId };
  }

  async deleteAllShortUrls(userId: string) {
    await prisma.source.deleteMany({ where: { userId } });
    await prisma.shortUrl.deleteMany({ where: { userId } });
    return { userId };
  }
}
