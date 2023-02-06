import { type Request, type Response } from 'express'
import { GetCustommersUseCase } from './GetCustomersUseCase'

export class GetCustomersController {
  async handle (req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const getCustomersUseCase = new GetCustommersUseCase()
    const customers = await getCustomersUseCase.execute()

    return res.json(customers)
  }
}
