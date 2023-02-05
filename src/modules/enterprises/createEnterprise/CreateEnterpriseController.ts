import { type Request, type Response } from "express";
import { CreateEnterpriseUseCase } from "./CreateEnterpriseUseCase";

export class CreateEnterpriseController {
  async handle(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { document, name, email } = req.body;

    const createEnterpriseUseCase = new CreateEnterpriseUseCase();

    const enterprise = await createEnterpriseUseCase.execute({
      document,
      name,
      email,
    });

    return res.json(enterprise);
  }
}
