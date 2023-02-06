import { type Request, type Response } from 'express'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  async handle (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { username, password } = req.body

    const authenticateUserUseCase = new AuthenticateUserUseCase()
    const result = await authenticateUserUseCase.execute({
      username,
      password
    })

    return res.json(result)
  }
}
