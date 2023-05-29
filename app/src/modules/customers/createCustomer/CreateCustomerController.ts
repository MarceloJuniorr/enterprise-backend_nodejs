import { type Request, type Response } from 'express'
import { CreateCustomerUseCase } from './CreateCustomerUseCase'

export class CreateCustomerController {
  async handle (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { cpf, name, phone, email, birthday, idEnterprise, accessProfile } = req.body

    const createCustomerUseCase = new CreateCustomerUseCase()

    const customer = await createCustomerUseCase.execute({
      cpf,
      name,
      phone,
      email,
      birthday,
      idEnterprise,
      accessProfile
    })

    return res.json(customer)
  }
}
