import {FastifyInstance} from "fastify"
import {z} from 'zod'
import dayjs from 'dayjs'

import {prisma} from "../lib/prisma"
import {authenticate} from '../plugins/authenticate'

import * as R from 'ramda'

interface Summary {
    id: string
    userId: string
    name: string
    email: string
    date: Date
    completed: number
    amount: number
}

export async function habitRoutes(app: FastifyInstance) {
    app.post('/habits',  {onRequest: [authenticate]}, async (request) => {

        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(z.number()).max(7),
        })

        // [0, 1, 2, 3, 4, 5, 6] => Domingo, Segunda, Terça, ...

        const {title, weekDays} = createHabitBody.parse(request.body)

        const today = dayjs().startOf('day').toDate()

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                user_id: request.user.sub,
                weekDays: {
                    create: weekDays.map(weekDay => ({
                        week_day: weekDay
                    }))
                },
            }
        })
    })

    app.get('/day', {onRequest: [authenticate]}, async (request) => {
        const getDayParams = z.object({
            date: z.coerce.date()
        })

        const {date} = getDayParams.parse(request.query)

        const parsedDate = dayjs(date).startOf('day')
        const weekDay = dayjs(parsedDate).get('day')

        // todos hábitos possiveis
        // hábitos que ja foram completados

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date,
                },
                user_id: request.user.sub,
                weekDays: {
                    some: {
                        week_day: weekDay
                    }
                },
            }
        })

        const day = await prisma.day.findUnique({
            where: {
                date_user_id: {
                    date: parsedDate.toDate(),
                    user_id: request.user.sub
                }
            },
            include: {
                dayHabits: true
            }
        })

        const completedHabits = day?.dayHabits.map(dayHabit => dayHabit.habit_id) ?? []

        return {
            possibleHabits,
            completedHabits
        }
    })

    app.patch('/habits/:id/toggle', {onRequest: [authenticate]}, async (request) => {
        const getToogleHabitParams = z.object({
            id: z.string().uuid()
        })

        const {id} = getToogleHabitParams.parse(request.params)

        const today = dayjs().startOf('day').toDate()

        let day = await prisma.day.findUnique({
            where: {
                date_user_id: {
                    date: today,
                    user_id: request.user.sub
                }
            }
        })

        if (!day) {
            day = await prisma.day.create({
                data: {
                    date: today,
                    user_id: request.user.sub
                }
            })
        }

        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    day_id: day.id,
                    habit_id: id,
                }
            }
        })

        if (dayHabit) {

            // Remover marcação de completo
            await prisma.dayHabit.delete({
                where: {
                    id: dayHabit.id
                }
            })

        } else {

            // Completar o hábito nesse dia
            await prisma.dayHabit.create({
                data: {
                    day_id: day.id,
                    habit_id: id,
                }
            })
        }

    })

    app.get('/summary', {onRequest: [authenticate]}, async (request) => {
        // [{date: 17/01, amount: 5, completed: 1}, {...}, {...}]

        const summary = await prisma.$queryRaw`
            SELECT 
                D.id,
                D.date,
                (
                    SELECT 
                        cast(count(*) as float)
                    FROM day_habits DH
                    WHERE DH.day_id = D.id
                ) as completed,
                (
                    SELECT 
                        cast(count(*) as float)
                    FROM habit_week_days HWD
                    JOIN habits H
                        ON H.id = HWD.habit_id
                    WHERE
                        HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
                        AND H.created_at <= D.date
                        AND H.user_id = ${request.user.sub}
                ) as amount
           FROM days D
           WHERE D.user_id = ${request.user.sub}
        `

        return {summary}
    })

    app.get('/summaries', async () => {
        // [{summary, user}, {summary, user}, {summary, user}]

        const allSummaries: Summary[] = await prisma.$queryRaw`
            SELECT 
                D.id,
                D.date,
                U.id as userId,
                U.name,
                U.email,
                (
                    SELECT 
                        cast(count(*) as float)
                    FROM day_habits DH
                    WHERE DH.day_id = D.id
                ) as completed,
                (
                    SELECT 
                        cast(count(*) as float)
                    FROM habit_week_days HWD
                    JOIN habits H
                        ON H.id = HWD.habit_id
                    WHERE
                        HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
                        AND H.created_at <= D.date
                ) as amount
            FROM days D
            JOIN users U
                ON U.id = D.user_id
        `

        const withUserId = R.groupWith<Summary>((a, b) => a.userId === b.userId)

        const summaries = withUserId(allSummaries).map(days => {
            const day = days[0]
            
            return {
                user: {
                    id: day.userId,
                    name: day.name,
                    email: day.email,
                },
                summary: days.map(day => ({
                    id: day.id,
                    userId: day.userId,
                    date: day.date,
                    completed: day.completed,
                    amount: day.amount,
                }))
            }
        })

        return {summaries}
    })
}
