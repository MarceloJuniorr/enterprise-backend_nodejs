import { prisma } from '../../../database/prismaClient'

interface IPatchCustomer {
  id: string
  document?: string
  name?: string
  phone?: string
  email?: string
  birthday?: string
  idEnterprise?: string
}

export class PatchCustomerUseCase {
  async execute ({
    id,
    document,
    name,
    phone,
    email,
    birthday,
    idEnterprise
  }: IPatchCustomer): Promise<void> {
    const customerExists = await prisma.customers.findFirst({
      where: {
        id
      }
    })

    if (customerExists == null) {
      throw new Error('Customer is invalid')
    }

    if (idEnterprise !== undefined) {
      const enterpriseExists = await prisma.enterprises.findFirst({
        where: {
          id: idEnterprise
        }
      })

      if (enterpriseExists == null) {
        throw new Error('Enterprise is invalid')
      }
    }
  }
}
