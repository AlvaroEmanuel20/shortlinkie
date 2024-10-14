import { Request, Response } from 'express';
import UsersService from '../services/users.service';
import HttpBusinessError from '../lib/errors/HttpBusinessError';
import { Prisma } from '@prisma/client';
import CustomBusinessError from '../lib/errors/CustomBusinessError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

type TokenQuery = {
  token: string;
};

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
      const result = await usersService.createUser(req.body);
      res.status(201).json(result);
    } catch (error) {
      throw new HttpBusinessError(
        'There is an user with this email',
        409,
        'users'
      );
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const userService = new UsersService();
      const { token } = req.query as TokenQuery;
      const result = await userService.verifyUser(token);
      res.json(result);
    } catch (error) {
      if (error instanceof CustomBusinessError) {
        throw new HttpBusinessError(error.message, 401, error.context);
      }

      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new HttpBusinessError('Token not found', 401, 'users');
      }
    }
  }

  async newVerify(req: Request, res: Response) {
    try {
      const userService = new UsersService();
      const result = await userService.newVerifyEmail(req.user.userId);
      res.json(result);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new HttpBusinessError('User not found', 404, 'users');
      }
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
        }

        if (error.code === 'P2025') {
          throw new HttpBusinessError('User not found', 404, 'users');
        }
      }
    }
  }

  async resetPass(req: Request, res: Response) {
    try {
      const userService = new UsersService();
      const result = await userService.resetPass(req.body.email);
      res.json(result);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new HttpBusinessError('User not found', 404, 'users');
      }
    }
  }

  async confirmResetPass(req: Request, res: Response) {
    try {
      const userService = new UsersService();
      const { token } = req.query as TokenQuery;
      const result = await userService.confirmResetPass(
        token,
        req.body.newPassword
      );

      res.json(result);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new HttpBusinessError('Token not found', 401, 'users');
      }

      if (error instanceof CustomBusinessError) {
        throw new HttpBusinessError(error.message, 401, 'users');
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
