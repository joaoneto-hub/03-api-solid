import { prisma } from '../lib/prisma';
export class PrismaUsersRepository {
  async create(data: { name: string; email: string; password_hash: string; }) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
} 