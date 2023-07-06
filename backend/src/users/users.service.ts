import prisma from '../utils/prisma';
import { UpdateUserData } from './users.interfaces';

export default class UsersService {
  async getUser(userId: string) {
    return await prisma.user.findUnique({ where: { userId } });
  }

  async updateUser(data: UpdateUserData, userId: string) {
    await prisma.user.update({
      where: { userId },
      data: { ...data },
    });

    return { userId };
  }

  async deleteUser(userId: string) {
    await prisma.user.delete({ where: { userId } });
    return { userId };
  }
}
