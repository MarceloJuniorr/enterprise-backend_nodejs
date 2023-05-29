import { prisma } from '../../../database/prismaClient'
import validDocument from '../../../utils/validDocument'
import validateEmail from '../../../utils/validEmail'
import findUsers from '../../mikroClient/hotspot/FindUsers'

interface IUpdateCustomer {
  cpf: string
  name?: string
  phone?: string
  email?: string
  birthday?: string
  idEnterprise?: string
  updateMkt: boolean
}

export class UpdateCustomerUseCase {
  async execute ({
    cpf,
    name,
    phone,
    email,
    birthday,
    idEnterprise,
    updateMkt
  }: IUpdateCustomer): Promise<object> {
    let updateCustomerData = {}
    const customerExists = await prisma.customers.findFirst({
      where: {
        cpf
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
      updateCustomerData = { ...updateCustomerData, id_enterprise: idEnterprise }
    }

    if (email !== undefined) {
      const emailIsValid = validateEmail(email)
      if (!emailIsValid) {
        throw new Error('Email is invalid')
      }
    }
    const docuentIsValid = validDocument(cpf)
    if (!docuentIsValid) {
      throw new Error('CPF is invalid')
    }
    updateCustomerData = { ...updateCustomerData, cpf }

    if (birthday !== undefined) {
      const formatedBirthday = new Date(birthday)
      updateCustomerData = { ...updateCustomerData, birthday: formatedBirthday }
    }

    updateCustomerData = { ...updateCustomerData, name, phone, email }

    const updateCustomer = await prisma.customers.update({
      where: {
        cpf
      },
      data: updateCustomerData
    })

    if (updateMkt) {
      const userId = findUsers({ name: customerExists.cpf, getId: true })
      console.log(userId)
    }

    return updateCustomer
  }
}
