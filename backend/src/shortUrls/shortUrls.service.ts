import { nanoid } from 'nanoid';
import prisma from '../utils/prisma';
import { CreateShortUrlData, UpdateShortUrlData } from './shortUrls.interfaces';

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

  async createClick(shortId: string, source?: string, isQrCode?: boolean) {
    await prisma.click.create({ data: { shortId, source, isQrCode } });
    return { shortId };
  }

  async getClicksListByDate(shortId: string, date: Date) {
    return await prisma.click.findMany({
      where: { shortId, createdAt: { equals: date } },
    });
  }

  async countClicksBySrc(shortId: string) {
    return await prisma.click.groupBy({
      by: ['source'],
      where: { shortId, source: { not: null }, isQrCode: false },
      _count: true,
    });
  }

  async countQrcodeClicks(shortId: string) {
    return await prisma.click.groupBy({
      by: ['source'],
      where: { shortId, isQrCode: true },
      _count: true,
    });
  }

  async countClicksByDate(shortId: string) {
    return await prisma.click.groupBy({
      by: ['createdAt'],
      where: { shortId },
      _count: true,
    });
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
