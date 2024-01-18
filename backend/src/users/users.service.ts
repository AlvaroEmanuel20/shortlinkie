import { hash } from 'bcryptjs';
import prisma from '../utils/prisma';
import { CreateUserData, UpdateUserData } from './users.interfaces';
import dayjs from 'dayjs';
import MailService from '../mail/mail.service';
import CustomBusinessError from '../utils/errors/CustomBusinessError';
import { User } from '@prisma/client';

export default class UsersService {
  async getUser(userId: string) {
    return await prisma.user.findUnique({
      where: { userId },
      select: {
        userId: true,
        name: true,
        email: true,
        avatarUrl: true,
        isVerified: true,
      },
    });
  }

  //SIGN UP AND VERIFY USER
  async createUser(data: CreateUserData) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        avatarUrl: data.avatarUrl,
        email: data.email,
        password: await hash(data.password, 10),
      },
    });

    //Create QR Code config
    await prisma.qrCodeConfig.create({
      data: {
        userId: user.userId,
      },
    });

    //Send verification email
    await this.sendConfirmMail(user);
    return { userId: user.userId, sentEmail: true };
  }

  async verifyUser(token: string) {
    const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
      where: {
        token,
      },
    });

    //Verify if token is expired
    const now = dayjs();
    const diff = now.diff(verificationToken.exp, 'hour');
    if (diff >= 1)
      throw new CustomBusinessError('Invalid verification token', 'users');

    await prisma.verificationToken.delete({
      where: { token },
    });

    //Update user isVerified flag
    await prisma.user.update({
      where: { userId: verificationToken.userId },
      data: { isVerified: true },
    });

    return { userId: verificationToken.userId };
  }

  async newVerifyEmail(userId: string) {
    const user = await prisma.user.findUniqueOrThrow({
      where: { userId },
    });

    let verificationToken = await prisma.verificationToken.findUniqueOrThrow({
      where: { userId },
    });

    //Verify if token is expired
    const now = dayjs();
    const diff = now.diff(verificationToken.exp, 'hour');
    if (diff >= 1) {
      await prisma.verificationToken.delete({
        where: { userId: user.userId },
      });

      verificationToken = await prisma.verificationToken.create({
        data: {
          exp: dayjs().add(1, 'hour').format(), //1 hour of expiration
          userId: user.userId,
        },
      });
    }

    //Send verification email
    const mailService = new MailService();
    const verificationUrl = process.env.VERIFICATION_USER_URL;
    await mailService.sendMail({
      to: user.email,
      subject: 'Confirm account',
      html: `<a href="${verificationUrl}?token=${verificationToken.token}">Clique para verificar</a>`,
      plainText: '',
    });

    return { userId, sentMail: true };
  }
  //SIGN UP AND VERIFY USER

  async updateUser(data: UpdateUserData, userId: string) {
    const user = await prisma.user.findUniqueOrThrow({ where: { userId } });

    if (data.password) data.password = await hash(data.password, 10);
    if (data.email && user.email !== data.email) {
      //Verify if email also will be changed, if yes send a new email verification
      await prisma.user.update({
        where: { userId },
        data: { isVerified: false },
      });

      //Send verification email
      await this.sendConfirmMail(user);
    }

    await prisma.user.update({
      where: { userId },
      data: { ...data },
    });

    return { userId };
  }

  //RESET PASS
  async resetPass(email: string) {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });

    const resetPassToken = await prisma.resetPassToken.create({
      data: {
        exp: dayjs().add(30, 'minutes').toDate(), //30 minutes of expiration
        userId: user.userId,
      },
    });

    //Send verification email
    const mailService = new MailService();
    const resetUrl = process.env.RESET_PASS_URL;
    await mailService.sendMail({
      to: user.email,
      subject: 'Reset password',
      html: `<a href="${resetUrl}?token=${resetPassToken.token}">Clique para resetar</a>`,
      plainText: '',
    });

    return { userId: user.userId, sentEmail: true };
  }

  async verifyResetPass(token: string) {
    const resetPassToken = await prisma.resetPassToken.findUniqueOrThrow({
      where: { token },
    });

    //Verify if token is expired
    const now = dayjs();
    const diff = now.diff(resetPassToken.exp, 'minutes');
    if (diff >= 30)
      throw new CustomBusinessError('Invalid reset pass token', 'users');

    return { userId: resetPassToken.userId, token };
  }

  async confirmResetPass(token: string, newPassword: string) {
    const resetPassToken = await prisma.resetPassToken.findUniqueOrThrow({
      where: { token },
    });

    await prisma.user.update({
      where: { userId: resetPassToken.userId },
      data: {
        password: await hash(newPassword, 10),
      },
    });

    await prisma.resetPassToken.delete({ where: { token } });
    return { userId: resetPassToken.userId, updatedPass: true };
  }
  //RESET PASS

  async deleteUser(userId: string) {
    await prisma.$transaction([
      prisma.click.deleteMany({ where: { shortUrl: { userId } } }),
      prisma.shortUrl.deleteMany({ where: { userId } }),
      prisma.verificationToken.deleteMany({ where: { userId } }),
      prisma.resetPassToken.deleteMany({ where: { userId } }),
      prisma.qrCodeConfig.delete({ where: { userId } }),
      prisma.user.delete({ where: { userId } }),
    ]);

    return { userId };
  }

  private async sendConfirmMail(user: User) {
    const verificationToken = await prisma.verificationToken.create({
      data: {
        exp: dayjs().add(1, 'hour').format(), //1 hour of expiration
        userId: user.userId,
      },
    });

    //Send verification email
    const mailService = new MailService();
    const verificationUrl = process.env.VERIFICATION_USER_URL;
    await mailService.sendMail({
      to: user.email,
      subject: 'Confirm account',
      html: `<a href="${verificationUrl}?token=${verificationToken.token}">Clique para verificar</a>`,
      plainText: '',
    });
  }
}
