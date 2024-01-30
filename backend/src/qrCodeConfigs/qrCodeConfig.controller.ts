import { Request, Response } from 'express';
import QrCodeConfigService from './qrCodeConfig.service';
import HttpBusinessError from '../utils/errors/HttpBusinessError';

export default class QrCodeConfigController {
  async get(req: Request, res: Response) {
    try {
      const qrCodeConfigService = new QrCodeConfigService();
      res.json(await qrCodeConfigService.getConfig(req.user.userId));
    } catch (error) {
      throw new HttpBusinessError('QR Code config not found', 404, 'qrconfig');
    }
  }

  async update(req: Request, res: Response) {
    try {
      const qrCodeConfigService = new QrCodeConfigService();
      const result = await qrCodeConfigService.updateConfig(
        req.body,
        req.user.userId
      );
      res.json(result);
    } catch (error) {
      throw new HttpBusinessError('QR Code config not found', 404, 'qrconfig');
    }
  }

  async uploadLogo(req: Request, res: Response) {
    try {
      const qrConfigServices = new QrCodeConfigService();

      if (!req.file) {
        throw new HttpBusinessError(
          'Upload QR Code logo server error',
          500,
          'qrcodelogo'
        );
      }

      const { logoId } = await qrConfigServices.uploadLogo(
        req.user.userId,
        req.file
      );

      res.json({ logoId });
    } catch (error) {
      throw new HttpBusinessError(
        'Upload QR Code logo server error',
        500,
        'qrcodelogo'
      );
    }
  }
}
