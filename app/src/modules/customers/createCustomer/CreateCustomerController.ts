import { type Request, type Response } from 'express'
import { CreateCustomerUseCase } from './CreateCustomerUseController'

export class CreateCustomerController {
  async handle (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { document, name, phone, email, birthday, idEnterprise } = req.body

    const createCustomerUseCase = new CreateCustomerUseCase()

    const customer = await createCustomerUseCase.execute({
      document,
      name,
      phone,
      email,
      birthday,
      idEnterprise
    })

    return res.json(customer)
  }
}
