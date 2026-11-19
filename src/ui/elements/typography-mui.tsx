/**
 * This component is purely for MUI support, as they tightly coupled html
 * semantic tag with the styling.
 *
 * If you're not migrating from an old MUI UI, you shouldn't use this
 * component, and should instead use the utility classes as per
 * Tailwindcss standards, which decouples styling from the semantic html tag.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const muiTypographyVariants = cva("", {
  variants: {
    variant: {
      // MUI compatibility variants
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      code: "relative rounded-lg border bg-muted/50 px-[0.3rem] py-[0.2rem] font-mono text-sm",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm leading-none font-medium",
      muted: "text-sm text-muted-foreground",
      body1: "text-base leading-6 [&:not(:first-child)]:mt-4",
      body2: "text-sm leading-5 [&:not(:first-child)]:mt-3",
      subtitle1: "text-base leading-6 font-medium",
      subtitle2: "text-sm leading-5 font-medium",
      caption: "text-xs leading-4 text-muted-foreground",
      overline:
        "text-xs font-medium tracking-widest text-muted-foreground uppercase",
      button: "text-sm leading-5 font-medium tracking-wide",
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
    variant: "body1",
    align: "inherit",
    color: "inherit",
    gutterBottom: false,
    noWrap: false,
  },
});

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
} as const;

type TypographyElement = keyof JSX.IntrinsicElements;
type TypographyVariant = keyof typeof variantElementMap;

interface MuiTypographyProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof muiTypographyVariants> {
  asChild?: boolean;
  component?: TypographyElement;
  children?: React.ReactNode;
}

const MuiTypography = React.forwardRef<HTMLElement, MuiTypographyProps>(
  (
    {
      className,
      variant = "body1",
      align,
      color,
      gutterBottom,
      noWrap,
      asChild = false,
      component,
      children,
      ...props
    },
    ref
  ) => {
    // Determine the component to render
    const elementType =
      component ||
      (variant ? variantElementMap[variant as TypographyVariant] : "p");
    const Comp = asChild ? Slot : (elementType as any);

    return (
      <Comp
        ref={ref}
        data-slot="typography"
        className={cn(
          muiTypographyVariants({
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
    );
  }
);
MuiTypography.displayName = "Typography";

export { MuiTypography, muiTypographyVariants, type MuiTypographyProps };
