import { prisma } from "../../../database/prismaClient"


interface IPatchCustomer {
    id:             string,
    cpf?:           string,
    name?:          string,
    phone?:         string,
    email?:         string,
    birthday?:      string,
    id_enterprise?: string
}


export class PatchCustomerUseCase {
    async execute({ 
        id, 
        cpf, 
        name, 
        phone, 
        email, 
        birthday, 
        id_enterprise }: IPatchCustomer ) {


            const customerExists = await prisma.customers.findFirst({
                where: {
                    id
                }
            })

            if (!customerExists) {
                throw new Error("Customer is invalid");
            }


            if (id_enterprise) {
                const enterpriseExists = await prisma.enterprises.findFirst({
                    where: {
                        id: id_enterprise
                    }
                })

                if (!enterpriseExists) {
                    throw new Error("Enterprise is invalid");
                }
            }

            

    }
}