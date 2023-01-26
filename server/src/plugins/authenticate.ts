import {User} from "@prisma/client"
import {FastifyInstance, FastifyRequest} from "fastify"

export async function authenticate(request: FastifyRequest) {
    await request.jwtVerify()
}

export function createJwtToken(fastify: FastifyInstance, user: User) {
    return fastify.jwt.sign(
        {
            name: user.name,
            email: user.email,
        },
        {
            sub: user.id, // Quem gerou o token
            expiresIn: "7 days",
        }
    )
}
