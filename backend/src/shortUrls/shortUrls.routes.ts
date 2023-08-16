import { Router } from 'express';
import ShortUrlsController from './shortUrls.controller';
import isAuthenticated from '../middlewares/isAuthenticated';
import validate from '../middlewares/validate';
import {
  createShortUrlSchema,
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
 *         clicks:
 *           type: number
 *         userId:
 *           type: string
 *         createdAt:
 *           type: date-time
 *         Source:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               clicks:
 *                 type: number
 *       example:
 *         shortId: google
 *         title: Google
 *         originalUrl: https://google.com
 *         clicks: 8
 *         userId: 123e4567-e89b-12d3-a456-426614174000
 *         createdAt: 2023-08-09T20:02:34.540Z
 *         Source:
 *           - name: instagram
 *             clicks: 2
 *     ShortId:
 *       type: object
 *       properties:
 *         shortId:
 *           type: string
 *       example:
 *         shortId: google
 *     Totals:
 *       type: object
 *       properties:
 *         totalClicks:
 *           type: number
 *         totalUrls:
 *           type: number
 *       example:
 *         totalClicks: 25
 *         totalUrls: 10
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
 * /all:
 *   get:
 *     tags: [ShortUrls]
 *     summary: Get all short url
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShortUrl'
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shortUrls
 * /all/totals:
 *   get:
 *     tags: [ShortUrls]
 *     summary: Get total of clicks and urls
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Totals'
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shortUrls
 * /details/{shortId}:
 *   get:
 *     tags: [ShortUrls]
 *     summary: Get detail about a short url
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
 *                 context: shortUrls
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shortUrls
 * /:
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
 *       404:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 404
 *                 message: There is an shortUrl with this shortId
 *                 context: shortUrls
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shortUrls
 * /{shortId}:
 *   get:
 *     tags: [ShortUrls]
 *     summary: Redirect
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
 *                 context: shortUrls
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shortUrls
 *   patch:
 *     tags: [ShortUrls]
 *     summary: Update a short url
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
 *                 context: shortUrls
 *       409:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 409
 *                 message: There is an short url with this shortId
 *                 context: shortUrls
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shortUrls
 *   delete:
 *     tags: [ShortUrls]
 *     summary: Delete a short url
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
 *                 context: shortUrls
 *       500:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 statusCode: 500
 *                 message: Internal server error
 *                 context: shortUrls
 */
shortUrlsRoutes.get(
  '/all',
  isAuthenticated,
  shortUrlsController.getAllShortUrl
);

shortUrlsRoutes.get(
  '/all/totals',
  isAuthenticated,
  shortUrlsController.getTotalClicksAndUrls
);

shortUrlsRoutes.get(
  '/details/:shortId',
  isAuthenticated,
  shortUrlsController.getShortUrl
);

shortUrlsRoutes.get('/:shortId', shortUrlsController.redirect);

shortUrlsRoutes.post(
  '/',
  isAuthenticated,
  validate(createShortUrlSchema),
  shortUrlsController.create
);

shortUrlsRoutes.patch(
  '/:shortId',
  isAuthenticated,
  validate(updateShortUrlSchema),
  shortUrlsController.update
);

shortUrlsRoutes.delete(
  '/:shortId',
  isAuthenticated,
  shortUrlsController.delete
);

export default shortUrlsRoutes;
