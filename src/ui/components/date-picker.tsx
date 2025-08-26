import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { Button } from "../elements/button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../elements/popover"

const datePickerVariants = cva(
  "w-fit justify-start text-left font-normal",
  {
    variants: {
      variant: {
        default: "border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        outline: "border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "border-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-3 py-2",
        sm: "h-8 px-2 py-1.5 text-xs",
        lg: "h-10 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
)

export interface DatePickerProps
  extends Omit<React.ComponentProps<typeof Button>, "children" | "onClick" | "variant" | "size" | "value">,
  VariantProps<typeof datePickerVariants> {
  value?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  dateFormat?: string
  calendarProps?: Omit<React.ComponentProps<typeof Calendar>, "mode" | "selected" | "onSelect">
  popoverProps?: {
    align?: "start" | "center" | "end"
    side?: "top" | "right" | "bottom" | "left"
  }
}

function DatePicker({
  value,
  onValueChange,
  placeholder = "Pick a date",
  disabled = false,
  className,
  variant,
  size,
  dateFormat = "PPP",
  calendarProps,
  popoverProps,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(value)

  React.useEffect(() => {
    setDate(value)
  }, [value])

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate)
    onValueChange?.(newDate)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          data-slot="date-picker-trigger"
          variant="outline"
          disabled={disabled}
          data-empty={!date}
          className={cn(
            datePickerVariants({ variant, size }),
            "data-[empty=true]:text-muted-foreground",
            className
          )}
          {...props}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, dateFormat) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        data-slot="date-picker-content"
        className="w-auto p-0"
        align={popoverProps?.align}
        side={popoverProps?.side}
      >
        <Calendar
          className="rounded-lg"
          mode="single"
          selected={date}
          onSelect={handleDateSelect as any}
          disabled={disabled}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }