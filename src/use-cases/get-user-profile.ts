import type { UsersRepository } from "@/repositories/users-repository";
import { User } from "@/generated/prisma";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";

interface GetUserProfileRequest {
  userId: string;
}

interface GetUserProfileResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }
    return {
      user,
    };
  }
}
