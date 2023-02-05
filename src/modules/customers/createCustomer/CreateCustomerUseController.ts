import { type Customers } from "@prisma/client";
import { prisma } from "../../../database/prismaClient";

interface ICreateCustomer {
  document: string;
  name: string;
  phone: string;
  email: string;
  idEnterprise: string;
  birthday: string;
}

export class CreateCustomerUseCase {
  async execute({
    document,
    name,
    phone,
    email,
    idEnterprise,
    birthday,
  }: ICreateCustomer): Promise<Customers> {
    const customerExists = await prisma.customers.findFirst({
      where: {
        cpf: document,
      },
    });
    if (customerExists != null) {
      throw new Error("Customer already exists!");
    }

    const enterpriseExists = await prisma.enterprises.findFirst({
      where: {
        id: idEnterprise,
      },
    });
    if (enterpriseExists == null) {
      throw new Error("Enterprise not is valid!");
    }

    const customer = await prisma.customers.create({
      data: {
        cpf: document,
        birthday,
        name,
        phone,
        email,
        id_enterprise: idEnterprise,
      },
    });
    return customer;
  }
}
