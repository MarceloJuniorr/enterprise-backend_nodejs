import { type Request, type Response } from 'express'
import { GetUsersUseCase } from './GetUsersUseCase'

export class GetUsersController {
  async handle (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { name } = req.body
    const getUseresUseCase = new GetUsersUseCase()

    const userList = await getUseresUseCase.execute({ name })

    return res.json(userList)
  }
}
