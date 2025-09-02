import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { AuthenticateUserUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./erros/invalid-credentials-erros";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";

let userRepository = new InMemoryUserRepository();
let sut = new GetUserProfileUseCase(userRepository);
describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new GetUserProfileUseCase(userRepository);
  });
  it("Should be able to get user profile", async () => {
    const createdUser = await userRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe");
  });
  it("Should be not able to get user profile with wrong id", async () => {
    await expect(
      sut.execute({
        userId: "not-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
