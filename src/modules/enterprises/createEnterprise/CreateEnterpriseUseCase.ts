import { prisma } from "../../../database/prismaClient";


interface ICreateEnterprise {
    cpf_cnpj : string;
    name: string;
    email?: string;
}

export class CreateEnterpriseUseCase {

    async execute({cpf_cnpj, name, email }: ICreateEnterprise) {
        
        const enterpriseExist = await prisma.enterprises.findFirst({
            where:{
                cpf_cnpj
            }
        })

        if (cpf_cnpj.length != 11 ) {
            if    (cpf_cnpj.length != 14 ) {
                throw new Error("cpf/cnpj not valid!");           
            } 
        }

        if (enterpriseExist) {

            throw new Error("Enterprise already exists!");
        }

        const enterprise = await prisma.enterprises.create({
            data: {
                cpf_cnpj,
                name,
                email
            }
        })        

        return enterprise
        
    }
}