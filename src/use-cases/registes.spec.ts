import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError } from "./erros/user-already-exists-error";

describe("Register Use Case", () => {
  it("Should be able to register a user", async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUserCase = new RegisterUseCase(userRepository);

    const { user } = await registerUserCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("Should hash user password upon registration ", async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUserCase = new RegisterUseCase(userRepository);

    const { user } = await registerUserCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("Should is not be able to register with an existing email", async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUserCase = new RegisterUseCase(userRepository);

    const email = "johndoe@example.com";

    await registerUserCase.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

  await expect(() =>
      registerUserCase.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
