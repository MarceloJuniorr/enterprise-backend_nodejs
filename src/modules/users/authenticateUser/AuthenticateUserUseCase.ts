import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { env } from "../../../../env";

interface IAuthenticateUser {
    username: string;
    password: string;
}

export class AuthenticateUserUseCase {
    async execute({username, password}: IAuthenticateUser) {

        const user = await prisma.users.findFirst({
            where: {
                username: username
            }
        })
        if (!user) {
            throw new Error ("Username or Password invalid")
            
        }
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error ("Username or Password invalid")
        }

        const token = sign({username}, env().SECRET_HASH , {
            subject: user.id,
            expiresIn: "1d"
        });
        return token;

    }
}