import { Routeros } from 'routeros-node'
import { credentialsMk } from './env'

export async function mikrotikApi (request: string[]): Promise<object[]> {
  const routeros = new Routeros(credentialsMk)
  const result = await routeros
    .connect()
    .then(async (conn) => await conn.write(request))
    .then((usersHotspot) => {
      return (usersHotspot)
    })
    .catch((error) => {
      console.log('error===>', error)
      throw new Error(error)
    })
    .finally(() => {
      routeros.destroy()
    })
  return result
}
