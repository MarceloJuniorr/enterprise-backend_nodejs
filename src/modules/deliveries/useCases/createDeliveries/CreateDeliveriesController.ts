import { Request, Response } from "express";
import { CreateDeliveriesUseCase } from "./CreateDeliveriesUseCase";



export class CreateDeliveriesController {
    async handle(req: Request, res: Response) {
        const { item_name } = req.body
        const { id_client } = req

        const createDeliveriesUseCase = new CreateDeliveriesUseCase();

        const delivery = await createDeliveriesUseCase.execute({
            id_client,
            item_name
        })

        
        return res.json(delivery)
    }
}