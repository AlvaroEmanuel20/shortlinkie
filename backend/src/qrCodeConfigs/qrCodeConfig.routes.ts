import { Router } from 'express';
import QrCodeConfigController from './qrCodeConfig.controller';
import validate from '../middlewares/validate';
import { updateQrCodeConfigSchema } from './qrCodeConfig.validations';
import isAuthenticated from '../middlewares/isAuthenticated';

const qrCodeConfigRoutes = Router();
const qrCodeConfigController = new QrCodeConfigController();

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     QrCodeConfigUpdateData:
 *       type: object
 *       properties:
 *         color:
 *           type: string
 *         size:
 *           type: number
 *         logo:
 *           type: string
 *       example:
 *         color: #FFFFF
 *         size: 150
 *     QRConfigResponse:
 *       type: object
 *       properties:
 *         configId:
 *           type: string
 *         color:
 *           type: string
 *         size:
 *           type: string
 *         logo:
 *           type: string
 *         userId:
 *           type: string
 *
 * tags: QRConfig
 * /api/qrconfig:
 *   get:
 *     tags: [QRConfig]
 *     summary: Get QR config details
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QRConfigResponse'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 404
 *                 message: QR config not found
 *                 context: qrconfig
 *   patch:
 *     tags: [QRConfig]
 *     summary: Update QR config
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 configId:
 *                   type: string
 *                 userId:
 *                   type: string
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 404
 *                 message: QR config not found
 *                 context: qrconfig
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: qrconfig
 */
qrCodeConfigRoutes.get('/', isAuthenticated, qrCodeConfigController.get);
qrCodeConfigRoutes.patch(
  '/',
  validate(updateQrCodeConfigSchema),
  isAuthenticated,
  qrCodeConfigController.update
);

export default qrCodeConfigRoutes;
