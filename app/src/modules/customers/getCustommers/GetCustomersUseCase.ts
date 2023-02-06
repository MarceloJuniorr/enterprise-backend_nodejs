import { type Customers } from '@prisma/client'
import { prisma } from '../../../database/prismaClient'

export class GetCustommersUseCase {
  async execute (): Promise<Customers[]> {
    const customers = prisma.customers.findMany()

    return await customers
  }
}
