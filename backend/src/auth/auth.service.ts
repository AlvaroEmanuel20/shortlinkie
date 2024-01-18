import { compare } from 'bcryptjs';
import prisma from '../utils/prisma';
import { LoginData } from './auth.interfaces';
import CustomBusinessError from '../utils/errors/CustomBusinessError';
import { sign } from 'jsonwebtoken';

export default class AuthService {
  async login(loginData: LoginData) {
    const { email, password } = loginData;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new CustomBusinessError('User not found', 'users');

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
