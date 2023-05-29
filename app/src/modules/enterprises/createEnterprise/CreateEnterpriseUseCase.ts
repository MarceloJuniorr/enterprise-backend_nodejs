import { type Enterprises } from '@prisma/client'
import { prisma } from '../../../database/prismaClient'
import validateEmail from '../../../utils/validEmail'

interface ICreateEnterprise {
  document: string
  name: string
  email: string
}

export class CreateEnterpriseUseCase {
  async execute ({
    document,
    name,
    email
  }: ICreateEnterprise): Promise<Enterprises> {
    const enterpriseExist = await prisma.enterprises.findFirst({
      where: {
        cpf_cnpj: document
      }
    })

    if (document.length !== 11) {
      if (document.length !== 14) {
        throw new Error('cpf/cnpj not valid!')
      }
    }

    if (enterpriseExist != null) {
      throw new Error('Enterprise already exists!')
    }

    const emailIsValid = validateEmail(email)
    if (!emailIsValid) {
      throw new Error('Email is invalid')
    }

    const enterprise = await prisma.enterprises.create({
      data: {
        cpf_cnpj: document,
        name,
        email
      }
    })

    return enterprise
  }
}
