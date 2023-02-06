import { type Request, type Response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  async handle (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { username, password } = req.body

    const createUserUseCase = new CreateUserUseCase()

    const user = await createUserUseCase.execute({
      username,
      password
    })

    return res.json(user)
  }
}
