import validDocument from '../utils/validDocument'
import validateEmail from '../utils/validEmail'
import { prisma } from './prismaClient'

export interface IInsertCustomer {
  cpf: string
  name: string
  phone: string
  email: string
  idEnterprise: string
  birthday: string
  accessProfile: string
}

export async function insertCustomer ({
  cpf,
  name,
  phone,
  email,
  idEnterprise,
  birthday,
  accessProfile
}: IInsertCustomer): Promise<any> {
  if (!validDocument(cpf)) {
    throw new Error('CPF is invalid')
  }

  const customerExists = await prisma.customers.findFirst({
    where: {
      cpf
    }
  })
  if (customerExists != null) {
    throw new Error('Customer already exists!')
  }
  console.log('cheguei')

  const enterpriseExists = await prisma.enterprises.findFirst({
    where: {
      id: idEnterprise
    }
  })
  if (enterpriseExists == null) {
    console.log('cheguei 2')

    throw new Error('Enterprise not is valid!')
  }

  const emailIsValid = validateEmail(email)
  if (!emailIsValid) {
    throw new Error('Email is invalid')
  }

  const customer = await prisma.customers.create({
    data: {
      cpf,
      birthday: new Date(birthday),
      name,
      phone,
      email,
      access_profile: accessProfile,
      id_enterprise: idEnterprise
    }
  })

  if (!('id' in customer)) {
    throw new Error('Erro ao inserir no banco de dados')
  }
  return customer
}
