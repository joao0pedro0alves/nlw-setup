import * as CheckboxUI from "@radix-ui/react-checkbox"
import {Check} from "phosphor-react"
import clsx from "clsx"

interface CheckboxProps extends CheckboxUI.CheckboxProps {
    label: string
    size?: "medium" | "large"
    lineThroughLabel?: boolean
}

export function Checkbox({label, size, lineThroughLabel, ...rest}: CheckboxProps) {
    return (
        <CheckboxUI.Root className="flex items-center gap-3 group" {...rest}>
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <CheckboxUI.Indicator>
                    <Check size={20} className="text-white" />
                </CheckboxUI.Indicator>
            </div>

            <span
                className={clsx("text-white leading-tight", {
                    "font-semibold text-xl": size === "large",
                    "group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400":
                        lineThroughLabel,
                })}
            >
                {label}
            </span>
        </CheckboxUI.Root>
    )
}

Checkbox.defaultProps = {
    size: "large",
    lineThroughLabel: false,
} as CheckboxProps
