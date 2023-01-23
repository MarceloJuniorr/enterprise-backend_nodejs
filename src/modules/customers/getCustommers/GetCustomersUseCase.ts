import { prisma } from "../../../database/prismaClient";



export class GetCustommersUseCase {
    async execute () {

        const customers = prisma.customers.findMany()

        return customers
    }
}