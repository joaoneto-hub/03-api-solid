import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUserUseCase } from "../authenticate";

export function makeAuthenticateUserCase() {
  const userRepository = new PrismaUsersRepository();
  const authenticateUserCase = new AuthenticateUserUseCase(userRepository);
  return authenticateUserCase;
}
