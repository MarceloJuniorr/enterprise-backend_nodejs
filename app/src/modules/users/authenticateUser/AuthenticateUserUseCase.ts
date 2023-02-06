import { prisma } from '../../../database/prismaClient'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IAuthenticateUser {
  username: string
  password: string
}

export class AuthenticateUserUseCase {
  async execute ({ username, password }: IAuthenticateUser): Promise<object> {
    const secretHash = '6bdc121614b67c643c46ab51dabea008'

    const user = await prisma.users.findFirst({
      where: {
        username
      }
    })
    if (user == null) {
      throw new Error('Username or Password invalid')
    }
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Username or Password invalid')
    }

    const token = sign({ username }, secretHash, {
      subject: user.id,
      expiresIn: '1d'
    })

    const tokenObject = {
      token

    }
    return tokenObject
  }
}
