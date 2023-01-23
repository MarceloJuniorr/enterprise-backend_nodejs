import { prisma } from "../../../../database/prismaClient";


interface ICreateDelivery {
    item_name: string;
    id_client: string
}

export class CreateDeliveriesUseCase {
    async execute({item_name, id_client}: ICreateDelivery) {

        const client = await prisma.clients.findFirst({
            where: {
                id: id_client
            }
        })
        if (!client) {
            throw new Error ("Client not found");
                        
        }

        const delivery = await prisma.deliveries.create({
            data: {
                id_client,
                item_name,
            }
        });

        return delivery

    }
}