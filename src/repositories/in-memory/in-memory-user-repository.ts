import type { User } from "@/generated/prisma";
import type { UsersRepository } from "../users-repository";

export class InMemoryUserRepository implements UsersRepository {
  private items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);
    return user || null;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);
    return user || null;
  }

  async create(data: any) {
    const user = {
      id: "user-id",
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };
    this.items.push(user);
    return user;
  }
}
