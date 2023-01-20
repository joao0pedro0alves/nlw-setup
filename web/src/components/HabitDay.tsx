import clsx from 'clsx'
import dayjs from 'dayjs'
import * as Popover from "@radix-ui/react-popover"

import {ProgressBar} from "./ProgressBar"
import {Checkbox} from './Checkbox'

interface HabitDayProps {
    date: Date
    completed?: number
    amount?: number
}

export function HabitDay({date, completed = 0, amount = 0}: HabitDayProps) {
    const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfWeek  = dayjs(date).format('dddd')

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx("w-10 h-10 border-2 rounded-lg", {
                    "bg-zinc-900 border-zinc-800": completedPercentage === 0,
                    "bg-violet-900 border-violet-700": completedPercentage > 0 && completed < 20,
                    "bg-violet-800 border-violet-600": completedPercentage >= 20 && completed < 40,
                    "bg-violet-700 border-violet-500": completedPercentage >= 40 && completed < 60,
                    "bg-violet-600 border-violet-500": completedPercentage >= 60 && completed < 80,
                    "bg-violet-500 border-violet-400": completedPercentage >= 80,
                })}
            />

            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>

                    <ProgressBar progress={completedPercentage} />

                    <div className="mt-5 flex flex-col gap-3">
                        <Checkbox 
                            label="Beber 2L de água"
                            lineThroughLabel
                        />
                    </div>

                    <Popover.Arrow
                        className="fill-zinc-900"
                        height={8}
                        width={16}
                    />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
