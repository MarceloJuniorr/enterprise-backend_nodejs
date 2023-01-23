import { Request, Response } from "express";
import { CreateEnterpriseUseCase } from "./CreateEnterpriseUseCase";


export class CreateEnterpriseController {
    async handle(req: Request, res: Response) {
        const { cpf_cnpj, name, email } = req.body

        const createEnterpriseUseCase = new CreateEnterpriseUseCase()

        const enterprise = await createEnterpriseUseCase.execute({
            cpf_cnpj,
            name,
            email
        })

        return res.json(enterprise)


    }
}