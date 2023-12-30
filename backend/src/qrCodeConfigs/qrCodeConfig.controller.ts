import { Request, Response } from 'express';
import QrCodeConfigService from './qrCodeConfig.service';
import HttpBusinessError from '../utils/errors/HttpBusinessError';

export default class QrCodeConfigController {
  async get(req: Request, res: Response) {
    try {
      const qrCodeConfigService = new QrCodeConfigService();
      res.json(await qrCodeConfigService.getConfig(req.user.userId));
    } catch (error) {
      throw new HttpBusinessError(
        'QR Code config not found',
        404,
        'qrconfig'
      );
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
      throw new HttpBusinessError(
        'QR Code config not found',
        404,
        'qrconfig'
      );
    }
  }
}
