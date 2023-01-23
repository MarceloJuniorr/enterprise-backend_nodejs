import { prisma } from "../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateUser {
    username: string;
    password: string;
}

export class CreateUserUseCase {

    async execute({username, password}: ICreateUser) {

        const userExist = await prisma.users.findFirst({
            where: {
                username: username
            }
        })
        if (userExist) {
            throw new Error ("user already exists")
        }

        const hashPassword = await hash(password, 10);
        const user = await prisma.users.create({
            data: {
                username,
                password: hashPassword
            }
        })
        return user

    }
}