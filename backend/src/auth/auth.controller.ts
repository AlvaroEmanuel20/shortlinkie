import { CookieOptions, Request, Response } from 'express';
import CustomBusinessError from '../utils/errors/CustomBusinessError';
import HttpBusinessError from '../utils/errors/HttpBusinessError';
import AuthService from './auth.service';

export default class AuthController {
  private readonly cookiesOpt: CookieOptions = {
    httpOnly: true,
    maxAge: process.env.COOKIES_MAX_AGE as number | undefined,
    secure: process.env.COOKIES_SECURE as boolean | undefined,
    sameSite: process.env.COOKIES_SAME_SITE as
      | boolean
      | 'lax'
      | 'strict'
      | 'none'
      | undefined,
  };

  async login(req: Request, res: Response) {
    try {
      const authService = new AuthService();
      const { userId, accessToken } = await authService.login(req.body);

      res.cookie('access_token', accessToken, this.cookiesOpt);
      res.json({ userId });
    } catch (error) {
      if (error instanceof CustomBusinessError) {
        if (error.context === 'password') {
          throw new HttpBusinessError(error.message, 401, error.context);
        } else {
          throw new HttpBusinessError(error.message, 404, error.context);
        }
      }
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const authService = new AuthService();
      const { success } = await authService.logout(
        req.cookies['access_token'],
        req.user.userId
      );
      res.clearCookie('access_token', this.cookiesOpt);
      res.json({ success });
    } catch (error) {
      throw new HttpBusinessError('Error to logout user', 500, 'auth');
    }
  }
}
