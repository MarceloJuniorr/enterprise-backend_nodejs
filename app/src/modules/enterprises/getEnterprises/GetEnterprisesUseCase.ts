import { type Enterprises } from '@prisma/client'
import { prisma } from '../../../database/prismaClient'

export class GetEnterprisesUseCase {
  async execute (): Promise<Enterprises[]> {
    const enterprises = await prisma.enterprises.findMany()

    return enterprises
  }
}
