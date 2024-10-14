import { compare } from 'bcryptjs';
import prisma from '../lib/prisma';
import { LoginData } from '../interfaces/auth.interfaces';
import CustomBusinessError from '../lib/errors/CustomBusinessError';
import { sign } from 'jsonwebtoken';

export default class AuthService {
  async login({ email, password }: LoginData) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });

    const comparePass = await compare(password, user.password);
    if (!comparePass)
      throw new CustomBusinessError('Invalid password', 'password');

    return {
      userId: user.userId,
      accessToken: sign(
        { userId: user.userId, email, sub: user.userId },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXP }
      ),
    };
  }

  async logout(token: string, userId: string) {
    await prisma.invalidToken.create({ data: { token, userId } });
    return { success: true };
  }
}
