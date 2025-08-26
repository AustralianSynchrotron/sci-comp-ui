import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const stackVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      column: "flex-col",
      "column-reverse": "flex-col-reverse",
    },
    spacing: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
      20: "gap-20",
      24: "gap-24",
    },
    alignItems: {
      stretch: "items-stretch",
      "flex-start": "items-start",
      "flex-end": "items-end",
      center: "items-center",
      baseline: "items-baseline",
    },
    justifyContent: {
      "flex-start": "justify-start",
      "flex-end": "justify-end",
      center: "justify-center",
      "space-between": "justify-between",
      "space-around": "justify-around",
      "space-evenly": "justify-evenly",
    },
    wrap: {
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
  },
  defaultVariants: {
    direction: "column",
    spacing: 2,
    alignItems: "stretch",
    justifyContent: "flex-start",
    wrap: "nowrap",
  },
})

interface StackProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stackVariants> {
  asChild?: boolean
  component?: React.ElementType
  divider?: React.ReactNode
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ 
    className, 
    direction, 
    spacing, 
    alignItems, 
    justifyContent, 
    wrap, 
    asChild = false, 
    component,
    divider,
    children,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : component || "div"
    
    // Handle divider logic
    const childrenArray = React.Children.toArray(children)
    const childrenWithDividers = divider && childrenArray.length > 1
      ? childrenArray.reduce<React.ReactNode[]>((acc, child, index) => {
          acc.push(child)
          if (index < childrenArray.length - 1) {
            acc.push(
              <div key={`divider-${index}`} className="shrink-0">
                {divider}
              </div>
            )
          }
          return acc
        }, [])
      : children
    
    return (
      <Comp
        ref={ref}
        data-slot="stack"
        className={cn(stackVariants({ direction, spacing, alignItems, justifyContent, wrap, className }))}
        {...props}
      >
        {childrenWithDividers}
      </Comp>
    )
  }
)
Stack.displayName = "Stack"

export { Stack, stackVariants }
export type { StackProps }