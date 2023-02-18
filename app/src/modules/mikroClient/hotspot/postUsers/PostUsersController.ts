import { type Request, type Response } from 'express'
import { PostUsersUseCase } from './PostUsersUseCase'

export class PostUsersController {
  async handle (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { name, password, profile } = req.body
    const postUseresUseCase = new PostUsersUseCase()
    const newUser = await postUseresUseCase.execute({ name, password, profile })

    return res.json(newUser)
  }
}
