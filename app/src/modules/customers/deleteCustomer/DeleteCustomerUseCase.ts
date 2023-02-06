import { type Customers } from '@prisma/client'
import { prisma } from '../../../database/prismaClient'

interface IDeleteCustomer {
  id: string
}

export class DeleteCustomerUseCase {
  async execute ({ id }: IDeleteCustomer): Promise<Customers> {
    const customerExists = await prisma.customers.findFirst({
      where: {
        id
      }
    })

    if (customerExists == null) {
      throw new Error('Customer is invalid!')
    }

    const customer = await prisma.customers.delete({
      where: {
        id
      }
    })

    return customer
  }
}
