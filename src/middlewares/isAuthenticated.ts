import { NextFunction, Request, Response } from 'express';
import HttpBusinessError from '../lib/errors/HttpBusinessError';
import { verify } from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { JWTPayload } from '../interfaces/auth.interfaces';

export default async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies['access_token'];
  if (!token) throw new HttpBusinessError('Token not found', 401, 'auth');

  try {
    const isTokenInBlackList = await prisma.invalidToken.findUnique({
      where: { token },
    });

    if (isTokenInBlackList)
      throw new HttpBusinessError('Invalid token', 401, 'auth');

    const { userId } = verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTPayload;

    req.user = {
      userId,
    };

    next();
  } catch (error) {
    throw new HttpBusinessError('Invalid token', 401, 'auth');
  }
}
