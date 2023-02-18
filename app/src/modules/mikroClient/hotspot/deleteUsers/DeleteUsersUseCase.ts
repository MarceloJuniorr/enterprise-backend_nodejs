import { Routeros } from 'routeros-node'
import { credentialsMk } from '../../../../utils/env'
import { GetUsersUseCase } from '../getUsers/GetUsersUseCase'

interface IDeleteUsers {
  name: string
}

export class DeleteUsersUseCase {
  async execute ({ name }: IDeleteUsers): Promise<any> {
    const routeros = new Routeros(credentialsMk)

    const getUseresUseCase = new GetUsersUseCase()
    const id: [{ '.id': string }] = await getUseresUseCase.execute({ name, getId: true })

    if (id[0] === undefined) {
      throw new Error('name not found')
    }

    const request = ['/ip/hotspot/user/remove', `=.id=${id[0]['.id']}`]

    if (name != null) { request.push(`?name=${name}`) }

    const deletedUser = await routeros
      .connect()
      .then(async (conn) => await conn.write(request))
      .then((usersHotspot) => {
        return (usersHotspot)
      })
      .catch((error) => {
        console.log('error===>', error)
        return error
      })
      .finally(() => {
        routeros.destroy()
      })

    if (deletedUser[0] === undefined) {
      return { message: 'Success' }
    }

    return deletedUser
  }
}
