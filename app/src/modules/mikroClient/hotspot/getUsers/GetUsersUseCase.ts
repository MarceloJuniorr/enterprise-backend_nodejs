import { Routeros } from 'routeros-node'
import { credentialsMk } from '../../../../utils/env'

interface IGetUsers {
  name?: string
}

export class GetUsersUseCase {
  async execute ({ name }: IGetUsers): Promise<any> {
    const routeros = new Routeros(credentialsMk)

    const request = ['/ip/hotspot/user/print', '=.proplist=disabled, name,profile']

    if (name != null) { request.push(`?name=${name}`) }

    const userList = await routeros
      .connect()
      .then(async (conn) => await conn.write(request))
      .then((usersHotspot) => {
        return (usersHotspot)
      })
      .catch((error) => {
        console.log('error===>', error)
        const mockError = [
          {
            '.id': '*4D',
            name: '13055483618',
            password: '13055483618',
            profile: 'admin',
            uptime: '10s',
            'bytes-in': '64619',
            'bytes-out': '70909',
            'packets-in': '180',
            'packets-out': '146',
            dynamic: 'false',
            disabled: 'false'
          }
        ]
        return mockError
      })
      .finally(() => {
        routeros.destroy()
      })

    return userList
  }
}
