import dayjs from "dayjs"
import {useEffect, useState} from "react"
import {api} from "../lib/axios"
import {generateDatesFromYearBeginning} from "../utils/generate-dates-from-year-beginning"
import {HabitDay} from "./HabitDay"

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S", "D"]

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length
interface SummaryItem {
    id: string
    date: string
    completed: number
    amount: number
}

export function SummaryTable() {
    const [summary, setSummary] = useState<SummaryItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function fetchSummary() {
            const response = await api.get('summary')
            setSummary(response.data.summary)
            setLoading(false)
        }

        fetchSummary()
    }, [])

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, i) => (
                    <div
                        key={`${weekDay}-${i}`}
                        className="text-zinc-400 text-xl w-10 h-10 flex items-center justify-center font-bold"
                    >
                        {weekDay}
                    </div>
                ))}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {!loading && summaryDates.map((date) => {
                    const dayInSummary = summary.find(summaryItem => {
                        return dayjs(date).isSame(summaryItem.date, 'day')
                    })

                    return (
                        <HabitDay
                            key={date.toString()}
                            date={date}
                            amount={dayInSummary?.amount}
                            defaultCompleted={dayInSummary?.completed}
                        />
                    )
                })}

                {amountOfDaysToFill > 0 &&
                    Array.from({length: amountOfDaysToFill}).map((_, index) => (
                        <div
                            key={"placeholder-square-" + index}
                            className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg cursor-not-allowed opacity-40"
                        />
                    ))}
            </div>
        </div>
    )
}
