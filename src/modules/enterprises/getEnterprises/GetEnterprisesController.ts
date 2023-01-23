import { Request, Response } from "express";
import { GetEnterprisesUseCase } from "./GetEnterprisesUseCase";


export class GetEnterprisesController {

    async handle(req:Request,  res: Response) {
        
        const getEnterprisesUseCase = new GetEnterprisesUseCase()

        const enterprises = await getEnterprisesUseCase.execute()

        return res.json(enterprises)

    }
}