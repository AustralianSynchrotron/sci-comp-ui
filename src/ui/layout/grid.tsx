import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const gridVariants = cva("grid", {
  variants: {
    container: {
      true: "",
      false: "",
    },
    item: {
      true: "",
      false: "",
    },
    // Grid container variants
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: "grid-cols-8",
      9: "grid-cols-9",
      10: "grid-cols-10",
      11: "grid-cols-11",
      12: "grid-cols-12",
      none: "grid-cols-none",
    },
    rows: {
      1: "grid-rows-1",
      2: "grid-rows-2",
      3: "grid-rows-3",
      4: "grid-rows-4",
      5: "grid-rows-5",
      6: "grid-rows-6",
      none: "grid-rows-none",
    },
    gap: {
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
    gapX: {
      0: "gap-x-0",
      1: "gap-x-1",
      2: "gap-x-2",
      3: "gap-x-3",
      4: "gap-x-4",
      5: "gap-x-5",
      6: "gap-x-6",
      8: "gap-x-8",
      10: "gap-x-10",
      12: "gap-x-12",
      16: "gap-x-16",
      20: "gap-x-20",
      24: "gap-x-24",
    },
    gapY: {
      0: "gap-y-0",
      1: "gap-y-1",
      2: "gap-y-2",
      3: "gap-y-3",
      4: "gap-y-4",
      5: "gap-y-5",
      6: "gap-y-6",
      8: "gap-y-8",
      10: "gap-y-10",
      12: "gap-y-12",
      16: "gap-y-16",
      20: "gap-y-20",
      24: "gap-y-24",
    },
    // Grid item variants
    colSpan: {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      5: "col-span-5",
      6: "col-span-6",
      7: "col-span-7",
      8: "col-span-8",
      9: "col-span-9",
      10: "col-span-10",
      11: "col-span-11",
      12: "col-span-12",
      full: "col-span-full",
    },
    rowSpan: {
      1: "row-span-1",
      2: "row-span-2",
      3: "row-span-3",
      4: "row-span-4",
      5: "row-span-5",
      6: "row-span-6",
      full: "row-span-full",
    },
    colStart: {
      1: "col-start-1",
      2: "col-start-2",
      3: "col-start-3",
      4: "col-start-4",
      5: "col-start-5",
      6: "col-start-6",
      7: "col-start-7",
      8: "col-start-8",
      9: "col-start-9",
      10: "col-start-10",
      11: "col-start-11",
      12: "col-start-12",
      13: "col-start-13",
    },
    colEnd: {
      1: "col-end-1",
      2: "col-end-2",
      3: "col-end-3",
      4: "col-end-4",
      5: "col-end-5",
      6: "col-end-6",
      7: "col-end-7",
      8: "col-end-8",
      9: "col-end-9",
      10: "col-end-10",
      11: "col-end-11",
      12: "col-end-12",
      13: "col-end-13",
    },
    rowStart: {
      1: "row-start-1",
      2: "row-start-2",
      3: "row-start-3",
      4: "row-start-4",
      5: "row-start-5",
      6: "row-start-6",
      7: "row-start-7",
    },
    rowEnd: {
      1: "row-end-1",
      2: "row-end-2",
      3: "row-end-3",
      4: "row-end-4",
      5: "row-end-5",
      6: "row-end-6",
      7: "row-end-7",
    },
  },
  defaultVariants: {
    container: false,
    item: false,
  },
})

interface GridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridVariants> {
  asChild?: boolean
  component?: React.ElementType
  // MUI Grid props for compatibility
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  size?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ 
    className, 
    container,
    item,
    columns,
    rows,
    gap,
    gapX,
    gapY,
    colSpan,
    rowSpan,
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    asChild = false, 
    component,
    xs,
    sm,
    md,
    lg,
    xl,
    size,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : component || "div"
    
    // Handle responsive grid sizing similar to MUI
    let responsiveClasses = ""
    
    // Handle size prop (can be number or object)
    if (typeof size === "number") {
      responsiveClasses += ` col-span-${size}`
    } else if (typeof size === "object" && size) {
      if (size.xs) responsiveClasses += ` col-span-${size.xs}`
      if (size.sm) responsiveClasses += ` sm:col-span-${size.sm}`
      if (size.md) responsiveClasses += ` md:col-span-${size.md}`
      if (size.lg) responsiveClasses += ` lg:col-span-${size.lg}`
      if (size.xl) responsiveClasses += ` xl:col-span-${size.xl}`
    }
    
    // Handle individual breakpoint props
    if (xs) responsiveClasses += ` col-span-${xs}`
    if (sm) responsiveClasses += ` sm:col-span-${sm}`
    if (md) responsiveClasses += ` md:col-span-${md}`
    if (lg) responsiveClasses += ` lg:col-span-${lg}`
    if (xl) responsiveClasses += ` xl:col-span-${xl}`
    
    return (
      <Comp
        ref={ref}
        data-slot="grid"
        className={cn(
          gridVariants({ 
            container, 
            item, 
            columns, 
            rows, 
            gap, 
            gapX, 
            gapY, 
            colSpan, 
            rowSpan, 
            colStart, 
            colEnd, 
            rowStart, 
            rowEnd,
            className 
          }),
          responsiveClasses
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

export { Grid, gridVariants }
export type { GridProps }