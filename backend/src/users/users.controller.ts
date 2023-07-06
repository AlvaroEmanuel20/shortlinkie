import { Request, Response } from 'express';
import UsersService from './users.service';
import HttpBusinessError from '../utils/errors/HttpBusinessError';

export default class UsersController {
  async getUser(req: Request, res: Response) {
    const usersService = new UsersService();
    const user = await usersService.getUser(req.user.userId);
    if (!user) throw new HttpBusinessError('User not found', 404, 'users');
    res.json(user);
  }

  async update(req: Request, res: Response) {
    try {
      //
    } catch (error) {
      //
    }
  }

  async delete(req: Request, res: Response) {
    try {
      //
    } catch (error) {
      //
    }
  }
}
