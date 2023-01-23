import {useEffect, useState} from "react"
import dayjs from "dayjs"

import {api} from "../lib/axios"
import {Checkbox} from "./Checkbox"

interface HabitsListsProps {
    date: Date
    onCompletedChanged: (completed: number) => void
}

interface HabitsInfo {
    possibleHabits: {
        id: string
        title: string
        created_at: string
    }[]
    completedHabits: string[]
}

export function HabitsList({date, onCompletedChanged}: HabitsListsProps) {
    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

    useEffect(() => {
        api.get("day", {
            params: {
                date: date.toISOString(),
            },
        })
            .then((response) => {
                setHabitsInfo(response.data)
            })
            .catch(console.error)
    }, [date])

    async function handleToogleHabit(habitId: string) {
        await api.patch(`habits/${habitId}/toggle`)

        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

        let completedHabits: string[] = []

        if (isHabitAlreadyCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
        } else {
            completedHabits = [...habitsInfo!.completedHabits].concat(habitId)
        }

        setHabitsInfo(({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits,
        }))

        onCompletedChanged(completedHabits.length)
    }

    const isDateInPast = dayjs(date)
        .endOf('day')
        .isBefore(new Date())

    return (
        <div className="mt-5 flex flex-col gap-3">
            {habitsInfo?.possibleHabits.map((possibleHabit) => {
                return (
                    <Checkbox
                        key={possibleHabit.id}
                        label={possibleHabit.title}
                        checked={habitsInfo.completedHabits.includes(possibleHabit.id)}
                        disabled={isDateInPast}
                        onCheckedChange={() => handleToogleHabit(possibleHabit.id)}
                        lineThroughLabel
                    />
                )
            })}
        </div>
    )
}
