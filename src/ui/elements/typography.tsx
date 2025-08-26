import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const typographyVariants = cva("", {
  variants: {
    variant: {
      // shadcn standard variants
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      code: "bg-muted/50 border relative rounded-lg px-[0.3rem] py-[0.2rem] font-mono text-sm",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      
      // MUI compatibility variants
      body1: "text-base leading-6 [&:not(:first-child)]:mt-4",
      body2: "text-sm leading-5 [&:not(:first-child)]:mt-3",
      subtitle1: "text-base font-medium leading-6",
      subtitle2: "text-sm font-medium leading-5",
      caption: "text-xs leading-4 text-muted-foreground",
      overline: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
      button: "text-sm font-medium leading-5 tracking-wide",
      inherit: "", // inherits from parent
    },
    align: {
      left: "text-left",
      center: "text-center", 
      right: "text-right",
      justify: "text-justify",
      inherit: "",
    },
    color: {
      inherit: "",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      success: "text-success",
      warning: "text-warning",
      error: "text-destructive",
      muted: "text-muted-foreground",
      disabled: "text-muted-foreground opacity-60",
    },
    gutterBottom: {
      true: "mb-4",
      false: "",
    },
    noWrap: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    variant: "p",
    align: "inherit",
    color: "inherit",
    gutterBottom: false,
    noWrap: false,
  },
})

// Map variants to their default HTML elements
const variantElementMap = {
  h1: "h1",
  h2: "h2", 
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  body1: "p",
  body2: "p",
  subtitle1: "p",
  subtitle2: "p",
  blockquote: "blockquote",
  code: "code",
  lead: "p",
  large: "div",
  small: "small",
  muted: "p",
  caption: "span",
  overline: "span",
  button: "span",
  inherit: "p",
} as const

type TypographyElement = keyof JSX.IntrinsicElements
type TypographyVariant = keyof typeof variantElementMap

interface TypographyProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>, VariantProps<typeof typographyVariants> {
  asChild?: boolean
  component?: TypographyElement
  children?: React.ReactNode
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(({
  className,
  variant = "p",
  align,
  color,
  gutterBottom,
  noWrap,
  asChild = false,
  component,
  children,
  ...props
}, ref) => {
  // Determine the component to render
  const elementType = component || (variant ? variantElementMap[variant as TypographyVariant] : "p")
  const Comp = asChild ? Slot : (elementType as any)

  return (
    <Comp
      ref={ref}
      data-slot="typography"
      className={cn(
        typographyVariants({
          variant,
          align,
          color,
          gutterBottom,
          noWrap,
          className,
        })
      )}
      {...props}
    >
      {children}
    </Comp>
  )
})
Typography.displayName = "Typography"

const TypographyH1 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="h1" className={className} {...props} />
  )
)
TypographyH1.displayName = "TypographyH1"

const TypographyH2 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="h2" className={className} {...props} />
  )
)
TypographyH2.displayName = "TypographyH2"

const TypographyH3 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="h3" className={className} {...props} />
  )
)
TypographyH3.displayName = "TypographyH3"

const TypographyH4 = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="h4" className={className} {...props} />
  )
)
TypographyH4.displayName = "TypographyH4"

const TypographyP = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="p" className={className} {...props} />
  )
)
TypographyP.displayName = "TypographyP"

const TypographyLead = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="lead" className={className} {...props} />
  )
)
TypographyLead.displayName = "TypographyLead"

const TypographyLarge = React.forwardRef<HTMLDivElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="large" className={className} {...props} />
  )
)
TypographyLarge.displayName = "TypographyLarge"

const TypographySmall = React.forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="small" className={className} {...props} />
  )
)
TypographySmall.displayName = "TypographySmall"

const TypographyMuted = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="muted" className={className} {...props} />
  )
)
TypographyMuted.displayName = "TypographyMuted"

const TypographyBlockquote = React.forwardRef<HTMLQuoteElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="blockquote" className={className} {...props} />
  )
)
TypographyBlockquote.displayName = "TypographyBlockquote"

const TypographyInlineCode = React.forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => (
    <Typography ref={ref} variant="code" className={className} {...props} />
  )
)
TypographyInlineCode.displayName = "TypographyInlineCode"

export {
  Typography,
  typographyVariants,
  TypographyH1,
  TypographyH2, 
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyBlockquote,
  TypographyInlineCode,
  type TypographyProps,
}