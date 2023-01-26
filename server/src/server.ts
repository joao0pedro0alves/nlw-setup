import Fastify from "fastify"
import cors from "@fastify/cors"
import jwt from '@fastify/jwt'
import * as dotenv from "dotenv"

import {habitRoutes} from "./routes/habits"
import {authRoutes} from "./routes/auth"

dotenv.config()

async function bootstrap() {
    const app = Fastify({
        logger: true
    })

    await app.register(cors, {
        origin: true
    })

    await app.register(jwt, {
        secret: process.env.JWT_ACCESS_SECRET,
    })

    await app.register(authRoutes)
    await app.register(habitRoutes)

    await app.listen({
        port: 3333,
        host: '0.0.0.0'
    })
}

bootstrap()
