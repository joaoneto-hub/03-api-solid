import { describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { AuthenticateUserUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './erros/invalid-credentials-erros'

describe('Authenticate Use Case', () => {
  it('Should be able to authenticate', async () => {
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUserUseCase(userRepository)

    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('Should be not able to authenticate with wrong email', async () => {
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUserUseCase(userRepository)

    await expect(
      sut.execute({
        email: 'wrong@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should be not able to authenticate with wrong password', async () => {
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUserUseCase(userRepository)

    await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      sut.execute({
        email: 'wrong@example.com',
        password: '123125',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
