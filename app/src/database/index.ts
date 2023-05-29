import { type Customers } from '@prisma/client'
import { type IInsertCustomer, insertCustomer } from './insertCustomer'

class Database {
  async insertCustomer (user: IInsertCustomer): Promise<Customers> {
    const userReturn = await insertCustomer(user)
    return userReturn
  }
}

const database = new Database()

export default database
