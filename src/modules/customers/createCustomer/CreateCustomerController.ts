import { Request, Response } from "express";
import { CreateCustomerUseCase } from "./CreateCustomerUseController";



export class CreateCustomerController {
    async handle (req: Request, res: Response){

        const {cpf, name, phone, email, birthday, id_enterprise } = req.body

        const createCustomerUseCase = new CreateCustomerUseCase();

        const customer = await createCustomerUseCase.execute({
            cpf,
            name,
            phone,
            email,
            birthday,
            id_enterprise
        })

        return res.json(customer)

    }
}

