import { hash } from 'bcryptjs';
import prisma from '../utils/prisma';
import { CreateUserData, UpdateUserData } from './users.interfaces';
import ShortUrlsService from '../shortUrls/shortUrls.service';

export default class UsersService {
  async getUser(userId: string) {
    return await prisma.user.findUnique({ where: { userId } });
  }

  async createUser(data: CreateUserData) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        avatarUrl: data.avatarUrl,
        email: data.email,
        password: await hash(data.password, 10),
      },
    });

    return { userId: user.userId };
  }

  async updateUser(data: UpdateUserData, userId: string) {
    await prisma.user.update({
      where: { userId },
      data: { ...data },
    });

    return { userId };
  }

  async deleteUser(userId: string) {
    const shortUrlsService = new ShortUrlsService();
    await shortUrlsService.deleteAllShortUrls(userId);
    await prisma.user.delete({ where: { userId } });
    return { userId };
  }
}
