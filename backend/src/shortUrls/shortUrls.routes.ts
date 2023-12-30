import { Router } from 'express';
import ShortUrlsController from './shortUrls.controller';
import isAuthenticated from '../middlewares/isAuthenticated';
import validate from '../middlewares/validate';
import {
  createShortUrlSchema,
  getClicksListByDateSchema,
  updateShortUrlSchema,
} from './shortUrls.validations';

const shortUrlsRoutes = Router();
const shortUrlsController = new ShortUrlsController();

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     ShortUrl:
 *       type: object
 *       properties:
 *         shortId:
 *           type: string
 *         title:
 *           type: string
 *         originalUrl:
 *           type: string
 *         userId:
 *           type: string
 *         createdAt:
 *           type: date-time
 *         _count:
 *           type: object
 *           properties:
 *             clicks: number
 *       example:
 *         shortId: google
 *         title: Google
 *         originalUrl: https://google.com
 *         userId: 123e4567-e89b-12d3-a456-426614174000
 *         createdAt: 2023-08-09T20:02:34.540Z
 *         _count:
 *           clicks: 4
 *     Click:
 *       type: object
 *       properties:
 *         clickId:
 *           type: string
 *         source:
 *           type: string
 *         isQrCode:
 *           type: boolean
 *         shortId:
 *           type: string
 *         createdAt:
 *           type: date-time
 *       example:
 *         clickId: 123e4567-e89b-12d3-a456-426614174000
 *         source: google
 *         isQrCode: false
 *         shortId: google
 *         createdAt: 2023-08-09T20:02:34.540Z
 *     ClicksBySrc:
 *       type: object
 *       properties:
 *         source:
 *           type: string
 *         _count:
 *           type: number
 *       example:
 *         _count: 12
 *         source: google
 *     ClicksByDate:
 *       type: object
 *       properties:
 *         createdAt:
 *           type: date-time
 *         _count:
 *           type: number
 *       example:
 *         _count: 12
 *         createdAt: 2023-08-09T20:02:34.540Z
 *     ShortId:
 *       type: object
 *       properties:
 *         shortId:
 *           type: string
 *       example:
 *         shortId: google
 *     CreateShortUrl:
 *       type: object
 *       required:
 *         - title
 *         - originalUrl
 *       properties:
 *         title:
 *           type: string
 *         originalUrl:
 *           type: string
 *       example:
 *         title: Google
 *         originalUrl: https://google.com
 *     UpdateShortUrl:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         originalUrl:
 *           type: string
 *         shortId:
 *           type: string
 *       example:
 *         title: Google - Buscador de sites
 *
 * tags: ShortUrls
 * /shorturls:
 *   get:
 *     tags: [ShortUrls]
 *     summary: Get all shorturls
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShortUrl'
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shorturls
 *   post:
 *     tags: [ShortUrls]
 *     summary: Create new short url
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateShortUrl'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShortId'
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shorturls
 * /shorturls/{shortId}:
 *   get:
 *     tags: [ShortUrls]
 *     summary: Get detail about a short url
 *     parameters:
 *       - in: path
 *         name: shortId
 *         type: string
 *         required: true
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShortUrl'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 404
 *                 message: Short url not found
 *                 context: shorturls
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shorturls
 *   patch:
 *     tags: [ShortUrls]
 *     summary: Update a short url
 *     parameters:
 *       - in: path
 *         name: shortId
 *         type: string
 *         required: true
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateShortUrl'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShortId'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 404
 *                 message: Short Url not found
 *                 context: shorturls
 *       409:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 409
 *                 message: There is an short url with this shortId
 *                 context: shorturls
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shorturls
 *   delete:
 *     tags: [ShortUrls]
 *     summary: Delete a short url
 *     parameters:
 *       - in: path
 *         name: shortId
 *         type: string
 *         required: true
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShortId'
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 404
 *                 message: Short url not found
 *                 context: shorturls
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shorturls
 * /{shortId}:
 *   get:
 *     tags: [ShortUrls]
 *     summary: Redirect
 *     parameters:
 *       - in: path
 *         name: shortId
 *         type: string
 *         required: true
 *       - in: query
 *         name: qrcode
 *         type: boolean
 *       - in: query
 *         name: src
 *         type: string
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       302:
 *         description: Redirect to original url
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 404
 *                 message: Short url not found
 *                 context: shorturls
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shorturls
 * /shorturls/clicks-list-date/{shortId}:
 *   get:
 *     tags: [ShortUrls]
 *     summary: Get all clicks of a date
 *     parameters:
 *       - in: path
 *         name: shortId
 *         type: string
 *         required: true
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Click'
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shorturls
 * /shorturls/clicks-src/{shortId}:
 *   get:
 *     tags: [ShortUrls]
 *     summary: Get clicks count by src
 *     parameters:
 *       - in: path
 *         name: shortId
 *         type: string
 *         required: true
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClicksBySrc'
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shorturls
 * /shorturls/clicks-qr/{shortId}:
 *   get:
 *     tags: [ShortUrls]
 *     summary: Get clicks count QR code
 *     parameters:
 *       - in: path
 *         name: shortId
 *         type: string
 *         required: true
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClicksBySrc'
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shorturls
 * /shorturls/clicks-date/{shortId}:
 *   get:
 *     tags: [ShortUrls]
 *     summary: Get clicks count by date
 *     parameters:
 *       - in: path
 *         name: shortId
 *         type: string
 *         required: true
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClicksByDate'
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shorturls
 */
shortUrlsRoutes.get(
  '/shorturls',
  isAuthenticated,
  shortUrlsController.getAllShortUrl
);

shortUrlsRoutes.get(
  '/shorturls/:shortId',
  isAuthenticated,
  shortUrlsController.getShortUrl
);

shortUrlsRoutes.get(
  '/shorturls/clicks-list-date/:shortId',
  validate(getClicksListByDateSchema),
  isAuthenticated,
  shortUrlsController.getClicksListByDate
);

//STATISTICS ROUTES
shortUrlsRoutes.get(
  '/shorturls/clicks-src/:shortId',
  isAuthenticated,
  shortUrlsController.getAllClicksBySrc
);

shortUrlsRoutes.get(
  '/shorturls/clicks-qr/:shortId',
  isAuthenticated,
  shortUrlsController.getAllQrcodeClicks
);

shortUrlsRoutes.get(
  '/shorturls/clicks-date/:shortId',
  isAuthenticated,
  shortUrlsController.getClicksByDate
);
//STATISTICS ROUTES

shortUrlsRoutes.get('/:shortId', shortUrlsController.redirect);

shortUrlsRoutes.post(
  '/shorturls',
  isAuthenticated,
  validate(createShortUrlSchema),
  shortUrlsController.create
);

shortUrlsRoutes.patch(
  '/shorturls/:shortId',
  isAuthenticated,
  validate(updateShortUrlSchema),
  shortUrlsController.update
);

shortUrlsRoutes.delete(
  '/shorturls/:shortId',
  isAuthenticated,
  shortUrlsController.delete
);

export default shortUrlsRoutes;
