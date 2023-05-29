import createUser from './hotspot/CreateUser'
import { deleteUser } from './hotspot/DeleteUser'
import { type IDeleteUser, type ICreateUser } from './interfaces'

class Mikrotik {
  async createUser (user: ICreateUser): Promise<any> {
    const userReturn = await createUser(user)
    return userReturn
  }

  async deleteUser (user: IDeleteUser): Promise<any> {
    const userReturn = await deleteUser(user)
    return userReturn
  }
}

const mikrotik = new Mikrotik()

export default mikrotik
