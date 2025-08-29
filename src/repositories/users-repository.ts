import type { User } from '@/generated/prisma'

export interface UsersRepository {
  findByEmail: (email: string) => Promise<User | null>
  create: (data: {
    name: string
    email: string
    password_hash: string
  }) => Promise<User>
}
