import { prisma } from "../../../database/prismaClient";



export class GetEnterprisesUseCase {

    async execute() {
        const enterprises = await prisma.enterprises.findMany()

        return enterprises
    }
}