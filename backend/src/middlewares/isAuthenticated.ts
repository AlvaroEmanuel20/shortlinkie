import { NextFunction, Request, Response } from 'express';
import HttpBusinessError from '../utils/errors/HttpBusinessError';
import { verify } from 'jsonwebtoken';

export default async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new HttpBusinessError('Token not found', 401, 'auth');

  try {
    const { userId } = verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    req.user.userId = userId;
    next();
  } catch (error) {
    throw new HttpBusinessError('Invalid token', 401, 'auth');
  }
}
