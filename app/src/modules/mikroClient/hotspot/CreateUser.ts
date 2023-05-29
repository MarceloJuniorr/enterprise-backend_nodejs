import { mikrotikApi } from '../../../utils/mikrotikApi'
import { type ICreateUser } from '../interfaces'

export default async function createUser ({ name, password, profile }: ICreateUser): Promise<object[]> {
  const request = ['/ip/hotspot/user/add']

  request.push(`=name=${name}`)
  request.push(`=password=${password}`)
  request.push(`=profile=${profile}`)

  const newUser = await mikrotikApi(request)

  if (!('.id' in newUser)) {
    throw new Error('Erro ao inserir usuário no mikrotik, Verifique se o cpf já foi cadastrado ou entre em contato com o suporte')
  }

  return newUser
}
