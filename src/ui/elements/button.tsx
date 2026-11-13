import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

// import { Loader2Icon } from "lucide-react";
import { cn } from "../../lib/utils";

import styles from "./button.module.css";

const buttonVariants = cva(styles.root, {
  variants: {
    variant: {
      default: styles.colorDefault,
      white: styles.colorWhite,
      warning: styles.colorWarning,
      alert: styles.colorAlert,
      success: styles.colorSuccess,
      iconOnly: styles.iconOnly,
    },
    size: {
      default: styles.sizeDefault,
      sm: styles.sizeSmall,
      lg: styles.sizeLarge,
    },
    rounded: {
      default: "rounded-sm",
      xs: "rounded-xs",
      md: "rounded-md",
    },
    iconPosition: {
      start: styles.iconStart,
      end: styles.iconEnd,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    rounded: "default",
    iconPosition: null,
  },
});

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
      icon?: React.ReactNode;
      //   loading?: boolean;
    }
>(
  (
    {
      className,
      variant,
      size,
      rounded,
      iconPosition,
      asChild = false,
      icon,
      //   loading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, rounded, iconPosition, className })
        )}
        ref={ref}
        {...props}
      >
        {/* {loading && <Loader2Icon className="size-3 animate-spin" />} */}
        {icon}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
