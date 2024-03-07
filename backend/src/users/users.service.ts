import { hash } from 'bcryptjs';
import prisma from '../utils/prisma';
import { CreateUserData, UpdateUserData } from './users.interfaces';
import dayjs from 'dayjs';
import MailService from '../mail/mail.service';
import CustomBusinessError from '../utils/errors/CustomBusinessError';
import { User } from '@prisma/client';
import s3Client from '../utils/s3Client';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import path from 'path';

export default class UsersService {
  async getUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { userId },
      select: {
        userId: true,
        name: true,
        email: true,
        avatarUrl: true,
        isVerified: true,
      },
    });

    return {
      user,
      avatarPresignedUrl: user?.avatarUrl
        ? await this.getAvatarUrl(user?.avatarUrl)
        : '',
    };
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

    if (data.password && data.newPassword)
      data.newPassword = await hash(data.newPassword, 10);

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
      data: {
        password: data.newPassword,
        avatarUrl: data.avatarUrl,
        email: data.email,
        name: data.name,
      },
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
      subject: 'Recupere sua senha e continue usando o Encurtando',
      html: `<a href="${resetUrl}?token=${resetPassToken.token}">Clique para resetar</a>`,
      plainText: `Recupere aqui: ${resetUrl}?token=${resetPassToken.token}`,
      templateId: Number(process.env.RECOVER_PASSWORD_TEMPLATE_ID),
      params: {
        FNAME: user.name,
        recoverPassLink: `${resetUrl}?token=${resetPassToken.token}`,
        newRecoverPassEmailLink: `${process.env.FRONT_URL}/recuperar-senha`,
      },
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
    const user = await prisma.user.findUnique({ where: { userId } });
    const qrConfig = await prisma.qrCodeConfig.findUnique({
      where: { userId },
    });

    if (user?.avatarUrl) {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: 'encurtando',
          Key: `avatars/${user.avatarUrl}`,
        })
      );
    }

    if (qrConfig?.logo) {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: 'encurtando',
          Key: `qrcode_logos/${qrConfig.logo}`,
        })
      );
    }

    await prisma.$transaction([
      prisma.click.deleteMany({ where: { shortUrl: { userId } } }),
      prisma.shortUrl.deleteMany({ where: { userId } }),
      prisma.verificationToken.deleteMany({ where: { userId } }),
      prisma.resetPassToken.deleteMany({ where: { userId } }),
      prisma.invalidToken.deleteMany({ where: { userId } }),
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

  async uploadAvatar(userId: string, avatar: Express.Multer.File) {
    const user = await prisma.user.findUnique({ where: { userId } });
    let avatarId = `avatar_${userId}${path.extname(avatar.originalname)}`;

    if (user?.avatarUrl) avatarId = user.avatarUrl;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: 'encurtando',
        Body: avatar.buffer,
        Key: `avatars/${avatarId}`,
      })
    );

    if (!user?.avatarUrl)
      await prisma.user.update({
        where: { userId },
        data: {
          avatarUrl: avatarId,
        },
      });

    return { avatarId };
  }

  private async getAvatarUrl(avatarId?: string | null) {
    if (!avatarId) return;

    return await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: 'encurtando',
        Key: `avatars/${avatarId}`,
      }),
      { expiresIn: 10800 } //3h
    );
  }
}
