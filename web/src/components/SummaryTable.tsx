import dayjs from 'dayjs'
import clsx from 'clsx'
import {generateDatesFromYearBeginning} from '../utils/generate-dates-from-year-beginning'
import {HabitDay} from './HabitDay'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D']

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length
export interface SummaryItem {
    id: string
    date: string
    completed: number
    amount: number
}

interface SummaryTableProps {
    summary: SummaryItem[]
    loading?: boolean
    disabledHabitPopover?: boolean
    size?: 'small' | 'medium'
}

export function SummaryTable({
    summary,
    loading = false,
    disabledHabitPopover = false,
    size = 'medium',
}: SummaryTableProps) {
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, i) => (
                    <div
                        key={`${weekDay}-${i}`}
                        className={clsx(
                            'text-zinc-400 flex items-center justify-center font-bold',
                            {
                                "w-10 h-10 text-xl": size === 'medium',
                                "w-8 h-8 text-lg": size === 'small',
                            }
                        )}
                    >
                        {weekDay}
                    </div>
                ))}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {!loading &&
                    summaryDates.map((date) => {
                        const dayInSummary = summary.find((summaryItem) => {
                            return dayjs(date).isSame(summaryItem.date, 'day')
                        })

                        return (
                            <HabitDay
                                key={date.toString()}
                                date={date}
                                amount={dayInSummary?.amount}
                                defaultCompleted={dayInSummary?.completed}
                                disabled={disabledHabitPopover}
                                size={size}
                            />
                        )
                    })}

                {amountOfDaysToFill > 0 &&
                    Array.from({length: amountOfDaysToFill}).map((_, index) => (
                        <div
                            key={'placeholder-square-' + index}
                            className={clsx(
                                'bg-zinc-900 border-2 border-zinc-800 rounded-lg cursor-not-allowed opacity-40',
                                {
                                    "w-10 h-10": size === 'medium',
                                    "w-8 h-8": size === 'small',
                                }
                            )}
                        />
                    ))}
            </div>
        </div>
    )
}
