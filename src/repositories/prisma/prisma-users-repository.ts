import { prisma } from '../../lib/prisma';
import type { UsersRepository } from '../users-repository';
export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  async create(data: { name: string; email: string; password_hash: string; }) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
} 