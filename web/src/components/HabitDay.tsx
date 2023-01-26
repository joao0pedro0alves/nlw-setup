import {useState} from 'react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import * as Popover from "@radix-ui/react-popover"

import {ProgressBar} from "./ProgressBar"
import {HabitsList} from './HabitsList'

interface HabitDayProps {
    date: Date
    defaultCompleted?: number
    amount?: number
    disabled?: boolean,
    size?: 'small' | 'medium'
}

export function HabitDay({date, defaultCompleted = 0, amount = 0, disabled, size ='medium'}: HabitDayProps) {
    const [completed, setCompleted] = useState(defaultCompleted)
    const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfWeek  = dayjs(date).format('dddd')

    function handleCompletedChanged(completed: number) {
        setCompleted(completed)
    }

    return (
        <Popover.Root>
            <Popover.Trigger
                disabled={disabled}
                className={clsx("border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed", {
                    "bg-zinc-900 border-zinc-800": completedPercentage === 0,
                    "bg-violet-900 border-violet-700": completedPercentage > 0 && completed < 20,
                    "bg-violet-800 border-violet-600": completedPercentage >= 20 && completed < 40,
                    "bg-violet-700 border-violet-500": completedPercentage >= 40 && completed < 60,
                    "bg-violet-600 border-violet-500": completedPercentage >= 60 && completed < 80,
                    "bg-violet-500 border-violet-400": completedPercentage >= 80,
                    "w-10 h-10": size === 'medium',
                    "w-8 h-8": size === 'small',
                })}
            />

            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
                    <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>

                    <ProgressBar progress={completedPercentage} />

                    <HabitsList 
                        date={date}
                        onCompletedChanged={handleCompletedChanged}
                    />

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
