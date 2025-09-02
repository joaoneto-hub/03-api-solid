import type { User } from "@/generated/prisma";

export interface UsersRepository {
  findById: (id: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  create: (data: {
    name: string;
    email: string;
    password_hash: string;
  }) => Promise<User>;
}
