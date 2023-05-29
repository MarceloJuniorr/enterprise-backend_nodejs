import { type Request, type Response } from 'express'
import { UpdateCustomerUseCase } from './UpdateCustomerUseCase'

export class UpdateCustomerController {
  async handle (
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { id, cpf, name, phone, email, birthday, idEnterprise } = req.body

    const updateCustomerUseCase = new UpdateCustomerUseCase()

    const customer = await updateCustomerUseCase.execute({
      id,
      cpf,
      name,
      phone,
      email,
      birthday,
      idEnterprise
    })

    return res.json(customer)
  }
}
