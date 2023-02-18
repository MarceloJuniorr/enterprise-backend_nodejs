import { type Request, type Response } from 'express'
import { DeleteUsersUseCase } from './DeleteUsersUseCase'

export class DeleteUsersController {
  async handle (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { name } = req.body
    const deleteUseresUseCase = new DeleteUsersUseCase()

    const userRemove = await deleteUseresUseCase.execute({ name })

    return res.json(userRemove)
  }
}
