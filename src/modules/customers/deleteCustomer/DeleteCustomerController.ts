import { Request, Response } from "express";
import { DeleteCustomerUseCase } from "./DeleteCustomerUseCase";




export class DeleteCustomerController {
    async handle (req: Request, res: Response) {
        const { id } = req.body
        const deleteCustomerUseCase = new DeleteCustomerUseCase();
        const customer = await deleteCustomerUseCase.execute({id});

        return res.json(customer)

    }
}