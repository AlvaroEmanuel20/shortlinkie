import prisma from '../utils/prisma';
import { QrCodeConfigUpdate } from './qrCodeConfig.interfaces';

export default class QrCodeConfigService {
  async getConfig(userId: string) {
    return await prisma.qrCodeConfig.findUnique({
      where: { userId },
    });
  }

  async updateConfig(data: QrCodeConfigUpdate, userId: string) {
    const result = await prisma.qrCodeConfig.update({
      where: { userId },
      data: { ...data },
    });

    return { configId: result.configId, userId };
  }
}
