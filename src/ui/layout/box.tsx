import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const boxVariants = cva("", {
  variants: {
    display: {
      block: "block",
      "inline-block": "inline-block",
      inline: "inline",
      flex: "flex",
      "inline-flex": "inline-flex",
      grid: "grid",
      "inline-grid": "inline-grid",
      none: "hidden",
    },
    position: {
      static: "static",
      relative: "relative",
      absolute: "absolute",
      fixed: "fixed",
      sticky: "sticky",
    },
    overflow: {
      visible: "overflow-visible",
      hidden: "overflow-hidden",
      scroll: "overflow-scroll",
      auto: "overflow-auto",
      "hidden-x": "overflow-x-hidden",
      "hidden-y": "overflow-y-hidden",
      "scroll-x": "overflow-x-scroll",
      "scroll-y": "overflow-y-scroll",
      "auto-x": "overflow-x-auto",
      "auto-y": "overflow-y-auto",
    },
    textAlign: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  },
  defaultVariants: {},
})

interface BoxProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof boxVariants> {
  asChild?: boolean
  component?: React.ElementType
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, display, position, overflow, textAlign, asChild = false, component, ...props }, ref) => {
    const Comp = asChild ? Slot : component || "div"
    
    return (
      <Comp
        ref={ref}
        data-slot="box"
        className={cn(boxVariants({ display, position, overflow, textAlign, className }))}
        {...props}
      />
    )
  }
)
Box.displayName = "Box"

export { Box, boxVariants }
export type { BoxProps }