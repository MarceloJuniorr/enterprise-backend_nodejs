import { prisma } from "../../../database/prismaClient";

interface ICreateCustomer {
    cpf: string;
    name: string;
    phone: string;
    email: string;
    id_enterprise: string;
    birthday: string;


}

export class CreateCustomerUseCase {
    async execute({cpf, name, phone, email, id_enterprise, birthday}: ICreateCustomer) {

        const customerExists = await prisma.customers.findFirst({
            where:{
                cpf
            }
        })
        if (customerExists) {
            throw new Error("Customer already exists!");
        }

        const enterpriseExists = await prisma.enterprises.findFirst({
            where: {
                id: id_enterprise
            }
        })
        if (!enterpriseExists) {
            throw new Error("Enterprise not is valid!");
        }

        const customer = await prisma.customers.create({
            data: {
                cpf,
                birthday,
                name,
                phone,
                email,
                id_enterprise
            }
        })
        return customer

    }
}