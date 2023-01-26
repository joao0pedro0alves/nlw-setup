import {FastifyInstance} from "fastify"
import {z} from "zod"

import {prisma} from '../lib/prisma'
import {authenticate, createJwtToken} from '../plugins/authenticate'

export async function authRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/me',
        { onRequest: [authenticate] },
        async (request) => {
            return { user: request.user }
        }
    )

    fastify.post('/users', async (request, reply) => {
        const createUserBody = z.object({
            name: z.string(),
            email: z.string().email(),
            firebaseId: z.string(),
        })

        const { name, email, firebaseId } = createUserBody.parse(request.body)

        let user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    name,
                    email,
                    firebaseId
                },
            })

            const token = createJwtToken(fastify, user)

            return { token }
        } else {
            return reply.status(400).send({
                message: 'Email already is registered.',
            })
        }
    })
        
    fastify.post('/session', async (request, reply) => {
        const createUserBody = z.object({
            firebaseId: z.string(),
        })

        const {firebaseId} = createUserBody.parse(request.body)

        const user = await prisma.user.findUnique({
            where: {
                firebaseId: firebaseId
            }
        })

        if (user) {

            const token = createJwtToken(fastify, user)
            return {token}
            
        } else {
            return reply.status(401).send({
                message: 'Sorry, user unregistered.',
            })
        }

    })
}
