import { mikrotikApi } from '../../../utils/mikrotikApi'

interface IFindUsers {
  name?: string
  getId?: boolean
}

export default async function findUsers ({ name, getId }: IFindUsers): Promise<any> {
  let request: string[] = []

  if (getId === undefined || !getId) {
    request = ['/ip/hotspot/user/print', '=.proplist=disabled,name,profile']
  } else {
    request = ['/ip/hotspot/user/print', '=.proplist=.id']
  }

  if (name != null) { request.push(`?name=${name}`) }

  const userList = await mikrotikApi(request)

  return userList
}
