import 'dotenv/config';
import { hash } from 'bcryptjs';
import prisma from '../lib/prisma';
import { CreateUserData, UpdateUserData } from '../interfaces/users.interfaces';
import dayjs from 'dayjs';
import MailService from '../services/mail.service';
import CustomBusinessError from '../lib/errors/CustomBusinessError';
import {
  TransactionalToken,
  TransactionalTokenType,
  User,
} from '@prisma/client';

export default class UsersService {
  async getUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { userId },
      select: {
        userId: true,
        name: true,
        email: true,
        isVerified: true,
      },
    });

    return user;
  }

  async createUser(data: CreateUserData) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: await hash(data.password, 10),
      },
    });

    await this.sendVerificationEmail(user);
    return { userId: user.userId, sentEmail: true };
  }

  async verifyUser(token: string) {
    const verificationToken = await prisma.transactionalToken.findFirstOrThrow({
      where: {
        token,
        tokenType: TransactionalTokenType.VERIFICATION,
      },
    });

    const isTokenExpired = await this.isTokenExpired(
      verificationToken,
      1,
      'hour'
    );

    if (isTokenExpired)
      throw new CustomBusinessError('Invalid verification token', 'users');

    await prisma.user.update({
      where: { userId: verificationToken.userId },
      data: { isVerified: true },
    });

    await prisma.transactionalToken.deleteMany({
      where: { token, tokenType: TransactionalTokenType.VERIFICATION },
    });

    return { userId: verificationToken.userId };
  }

  async newVerifyEmail(userId: string) {
    const user = await prisma.user.findUniqueOrThrow({
      where: { userId },
    });

    const verificationToken = await prisma.transactionalToken.findFirst({
      where: { userId, tokenType: TransactionalTokenType.VERIFICATION },
    });

    await this.sendVerificationEmail(user, verificationToken);
    return { userId, sentMail: true };
  }

  async updateUser(data: UpdateUserData, userId: string) {
    const user = await prisma.user.findUniqueOrThrow({ where: { userId } });

    if (data.password && data.newPassword)
      data.newPassword = await hash(data.newPassword, 10);

    if (data.email && user.email !== data.email) {
      await prisma.user.update({
        where: { userId },
        data: { isVerified: false },
      });

      await this.sendVerificationEmail(user);
    }

    await prisma.user.update({
      where: { userId },
      data: {
        password: data.newPassword,
        email: data.email,
        name: data.name,
      },
    });

    return { userId };
  }

  async resetPass(email: string) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });

    const resetPassToken = await prisma.transactionalToken.create({
      data: {
        exp: dayjs().add(30, 'minutes').toDate(),
        userId: user.userId,
        tokenType: TransactionalTokenType.RESET_PASS,
      },
    });

    const mailService = new MailService();
    const resetUrl = process.env.RESET_PASS_URL;
    await mailService.sendMail({
      to: user.email,
      subject: 'Recupere sua senha e continue usando o Encurtando',
      html: `<a href="${resetUrl}?token=${resetPassToken.token}">Clique para resetar</a>`,
      plainText: `Recupere aqui: ${resetUrl}?token=${resetPassToken.token}`,
      templateId: Number(process.env.RECOVER_PASSWORD_TEMPLATE_ID),
      params: {
        FNAME: user.name,
        recoverPassLink: `${resetUrl}?token=${resetPassToken.token}`,
      },
    });

    return { userId: user.userId, sentEmail: true };
  }

  async confirmResetPass(token: string, newPassword: string) {
    const resetPassToken = await prisma.transactionalToken.findFirstOrThrow({
      where: { token, tokenType: TransactionalTokenType.RESET_PASS },
    });

    const isTokenExpired = await this.isTokenExpired(
      resetPassToken,
      30,
      'minutes'
    );

    if (isTokenExpired)
      throw new CustomBusinessError('Invalid reset pass token', 'users');

    await prisma.user.update({
      where: { userId: resetPassToken.userId },
      data: {
        password: await hash(newPassword, 10),
      },
    });

    await prisma.transactionalToken.deleteMany({
      where: { token, tokenType: TransactionalTokenType.RESET_PASS },
    });

    return { userId: resetPassToken.userId, updatedPass: true };
  }

  async deleteUser(userId: string) {
    await prisma.$transaction([
      prisma.click.deleteMany({ where: { shortUrl: { userId } } }),
      prisma.shortUrl.deleteMany({ where: { userId } }),
      prisma.transactionalToken.deleteMany({ where: { userId } }),
      prisma.invalidToken.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { userId } }),
    ]);

    return { userId };
  }

  private async sendVerificationEmail(
    user: User,
    verificationToken?: TransactionalToken | null
  ) {
    if (verificationToken) {
      const isTokenExpired = await this.isTokenExpired(
        verificationToken,
        1,
        'hour'
      );

      if (isTokenExpired) {
        await prisma.transactionalToken.deleteMany({
          where: {
            userId: user.userId,
            tokenType: TransactionalTokenType.VERIFICATION,
          },
        });

        verificationToken = await prisma.transactionalToken.create({
          data: {
            exp: dayjs().add(1, 'hour').format(),
            userId: user.userId,
            tokenType: TransactionalTokenType.VERIFICATION,
          },
        });
      }
    } else {
      verificationToken = await prisma.transactionalToken.create({
        data: {
          exp: dayjs().add(1, 'hour').format(),
          userId: user.userId,
          tokenType: TransactionalTokenType.VERIFICATION,
        },
      });
    }

    const mailService = new MailService();
    const verificationUrl = process.env.VERIFICATION_USER_URL;
    await mailService.sendMail({
      to: user.email,
      subject: 'Bem vindo(a) ao Encurtando, confirme seu email',
      html: `<a href="${verificationUrl}?token=${verificationToken.token}">Clique para verificar</a>`,
      plainText: `Verifique aqui: ${verificationUrl}?token=${verificationToken.token}`,
      templateId: Number(process.env.CONFIRM_ACCOUNT_TEMPLATE_ID),
      params: {
        FNAME: user.name,
        confirmEmailLink: `${verificationUrl}?token=${verificationToken.token}`,
      },
    });
  }

  private async isTokenExpired(
    token: TransactionalToken,
    expMax: number,
    expUnit: dayjs.QUnitType
  ) {
    const now = dayjs();
    const diff = now.diff(token.exp, expUnit);
    return diff > expMax ? true : false;
  }
}
