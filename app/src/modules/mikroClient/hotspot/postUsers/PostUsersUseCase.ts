import { Routeros } from 'routeros-node'
import { credentialsMk } from '../../../../utils/env'

interface IPostUsers {
  name: string
  password: string
  profile: string
}

export class PostUsersUseCase {
  async execute ({ name, password, profile }: IPostUsers): Promise<any> {
    const routeros = new Routeros(credentialsMk)

    const request = ['/ip/hotspot/user/add']

    request.push(`=name=${name}`)
    request.push(`=password=${password}`)
    request.push(`=profile=${profile}`)

    const newUser = await routeros
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

    return newUser
  }
}
