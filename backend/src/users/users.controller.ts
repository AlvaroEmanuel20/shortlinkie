import { Request, Response } from 'express';
import UsersService from './users.service';
import HttpBusinessError from '../utils/errors/HttpBusinessError';
import { Prisma } from '@prisma/client';
import CustomBusinessError from '../utils/errors/CustomBusinessError';
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

  //SIGN UP AND VERIFY USER
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
      const { userId } = await userService.verifyUser(token);

      res.redirect(process.env.DASHBOARD_URL as string);
    } catch (error) {
      if (error instanceof CustomBusinessError) {
        throw new HttpBusinessError(error.message, 403, error.context);
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpBusinessError('Invalid token', 403, 'users');
      }
    }
  }

  async newVerify(req: Request, res: Response) {
    try {
      const userService = new UsersService();
      const result = await userService.newVerifyEmail(req.user.userId);
      res.status(201).json(result);
    } catch (error) {
      throw new HttpBusinessError('Internal server error', 500, 'users');
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

  //RESET PASS
  async resetPass(req: Request, res: Response) {
    try {
      const userService = new UsersService();
      const result = await userService.resetPass(req.body.email);
      res.status(201).json(result);
    } catch (error) {
      throw new HttpBusinessError('User not found', 404, 'users');
    }
  }

  async verifyResetPass(req: Request, res: Response) {
    try {
      const userService = new UsersService();
      const { token } = req.query as TokenQuery;
      const { userId, token: resetPassToken } =
        await userService.verifyResetPass(token);

      res.redirect(`${process.env.FRONT_RESET_PASS}?token=${resetPassToken}`);
    } catch (error) {
      if (error instanceof CustomBusinessError) {
        throw new HttpBusinessError(error.message, 403, error.context);
      } else if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpBusinessError('Invalid token', 403, 'users');
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

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpBusinessError('Invalid token', 403, 'users');
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
