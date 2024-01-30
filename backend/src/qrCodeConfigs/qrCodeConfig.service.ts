import path from 'path';
import prisma from '../utils/prisma';
import { QrCodeConfigUpdate } from './qrCodeConfig.interfaces';
import s3Client from '../utils/s3Client';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import imageUrlToBase64 from '../utils/imageUrlToBase64';

export default class QrCodeConfigService {
  async getConfig(userId: string) {
    const qrConfig = await prisma.qrCodeConfig.findUnique({
      where: { userId },
    });

    return {
      qrConfig,
      logoPresignedUrl: qrConfig?.logo
        ? await this.getLogoUrl(qrConfig?.logo)
        : '',
      base64LogoPresignedUrl: await imageUrlToBase64(
        (await this.getLogoUrl(qrConfig?.logo)) || ''
      ),
    };
  }

  async updateConfig(data: QrCodeConfigUpdate, userId: string) {
    const result = await prisma.qrCodeConfig.update({
      where: { userId },
      data: { ...data },
    });

    return { configId: result.configId, userId };
  }

  async uploadLogo(userId: string, logo: Express.Multer.File) {
    const qrConfig = await prisma.qrCodeConfig.findUnique({
      where: { userId },
    });

    let logoId = `qrconfiglogo_${userId}${path.extname(logo.originalname)}`;
    if (qrConfig?.logo) logoId = qrConfig.logo;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: 'encurtando',
        Body: logo.buffer,
        Key: `qrcode_logos/${logoId}`,
      })
    );

    if (!qrConfig?.logo)
      await prisma.qrCodeConfig.update({
        where: { userId },
        data: {
          logo: logoId,
        },
      });

    return { logoId };
  }

  private async getLogoUrl(logoId?: string | null) {
    if (!logoId) return;

    return await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: 'encurtando',
        Key: `qrcode_logos/${logoId}`,
      }),
      { expiresIn: 10800 } //3h
    );
  }
}
