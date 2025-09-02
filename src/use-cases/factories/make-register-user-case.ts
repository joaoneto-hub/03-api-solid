import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUserCase() {
  const userRepository = new PrismaUsersRepository();
  const registerUserCase = new RegisterUseCase(userRepository);
  return registerUserCase;
}
