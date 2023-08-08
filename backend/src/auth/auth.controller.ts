import { Request, Response } from 'express';
import CustomBusinessError from '../utils/errors/CustomBusinessError';
import HttpBusinessError from '../utils/errors/HttpBusinessError';
import AuthService from './auth.service';

export default class AuthController {
  async login(req: Request, res: Response) {
    try {
      const authService = new AuthService();
      const result = await authService.login(req.body);
      res.json(result);
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
}
