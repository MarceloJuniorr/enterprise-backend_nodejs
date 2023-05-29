import { type Request, type Response } from 'express'
import { FindCustommersUseCase } from './FindCustomersUseCase'

export class FindCustomersController {
  async handle (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const findCustomersUseCase = new FindCustommersUseCase()
    const customers = await findCustomersUseCase.execute()

    return res.json(customers)
  }
}
