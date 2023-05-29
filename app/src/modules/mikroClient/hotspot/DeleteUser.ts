import findUsers from './FindUsers'
import { type IDeleteUser } from '../interfaces'
import { mikrotikApi } from '../../../utils/mikrotikApi'

export async function deleteUser ({ name }: IDeleteUser): Promise<object[]> {
  const user: [{ '.id': string }] = await findUsers({ name, getId: true })

  if (user[0] === undefined) {
    throw new Error('name not found')
  }

  const request = ['/ip/hotspot/user/remove', `=.id=${user[0]['.id']}`]

  const deletedUser = await mikrotikApi(request)

  if (deletedUser[0] === undefined) {
    return [{ message: 'Success' }]
  }

  return deletedUser
}
