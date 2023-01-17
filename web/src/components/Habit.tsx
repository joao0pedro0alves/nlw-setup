interface HabitProps {
    completed: number
}

export function Habit(props: HabitProps) {
    return (
        <div className="bg-zinc-900 w-10 h-10 m-2 text-center rounded text-white flex items-center justify-center">
            {props.completed}
        </div>
    )
}