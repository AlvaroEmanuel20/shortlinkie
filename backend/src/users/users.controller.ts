import { Request, Response } from 'express';
import UsersService from './users.service';
import HttpBusinessError from '../utils/errors/HttpBusinessError';
import { Prisma } from '@prisma/client';

export default class UsersController {
  async getUser(req: Request, res: Response) {
    const usersService = new UsersService();
    const user = await usersService.getUser(req.user.userId);
    if (!user) throw new HttpBusinessError('User not found', 404, 'users');
    res.json(user);
  }

  async create(req: Request, res: Response) {
    try {
      const usersService = new UsersService();
      const { userId } = await usersService.createUser(req.body);
      res.status(201).json({ userId });
    } catch (error) {
      throw new HttpBusinessError(
        'There is an user with this email',
        409,
        'users'
      );
    }
  }

  async update(req: Request, res: Response) {
    try {
      const usersService = new UsersService();
      const { userId } = await usersService.updateUser(
        req.body,
        req.user.userId
      );
      res.json({ userId });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpBusinessError(
            'There is an user with this email',
            409,
            'users'
          );
        } else {
          throw new HttpBusinessError('User not found', 404, 'users');
        }
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const usersService = new UsersService();
      const { userId } = await usersService.deleteUser(req.user.userId);
      res.json({ userId });
    } catch (error) {
      throw new HttpBusinessError('User not found', 404, 'users');
    }
  }
}
