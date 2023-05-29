import database from '../../../database'
import mikrotik from '../../mikroClient'

interface ICreateCustomer {
  cpf: string
  name: string
  phone: string
  email: string
  idEnterprise: string
  birthday: string
  accessProfile: string
}

export class CreateCustomerUseCase {
  async execute (customer: ICreateCustomer): Promise<object> {
    const resultCustomer = await database.insertCustomer(customer)
    const cpf = resultCustomer.cpf
    const name = resultCustomer.name
    const accessProfile = resultCustomer.access_profile
    if (name === undefined) {
      throw new Error('Erro no retorno do banco de dados')
    }
    await mikrotik.createUser({ name: cpf, password: cpf, profile: accessProfile })

    const json = { message: `Cliente ${name} cadastrado com sucesso` }
    return json
  }
}
