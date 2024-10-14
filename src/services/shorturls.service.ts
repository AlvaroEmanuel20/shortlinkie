import { nanoid } from 'nanoid';
import prisma from '../lib/prisma';
import {
  CreateShortUrlData,
  UpdateShortUrlData,
} from '../interfaces/shorturls.interfaces';

export default class ShortUrlsService {
  async getAllShortUrls(userId: string) {
    return await prisma.shortUrl.findMany({
      where: { userId },
      include: {
        _count: {
          select: {
            clicks: true,
          },
        },
      },
    });
  }

  async getShortUrl(shortId: string) {
    return await prisma.shortUrl.findUnique({
      where: { shortId },
      include: {
        _count: {
          select: {
            clicks: true,
          },
        },
      },
    });
  }

  async countTotalClicksBySrc(userId: string) {
    return await prisma.click.groupBy({
      by: ['source'],
      where: { source: { not: null }, shortUrl: { userId } },
      _count: true,
    });
  }

  async countClicksBySrcOfShortId(shortId: string) {
    return await prisma.click.groupBy({
      by: ['source'],
      where: { shortId, source: { not: null }},
      _count: true,
    });
  }

  async redirect(shortId: string, source?: string) {
    const shortUrl = await prisma.shortUrl.findUniqueOrThrow({
      where: {
        shortId,
      },
    });

    await prisma.click.create({ data: { shortId, source } });

    return shortUrl;
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

  async updateShortUrl(data: UpdateShortUrlData, shortId: string) {
    await prisma.shortUrl.update({
      where: { shortId },
      data: { ...data },
    });

    return { shortId };
  }

  async deleteShortUrl(shortId: string) {
    await prisma.$transaction([
      prisma.click.deleteMany({ where: { shortId } }),
      prisma.shortUrl.delete({ where: { shortId } }),
    ]);

    return { shortId };
  }
}
