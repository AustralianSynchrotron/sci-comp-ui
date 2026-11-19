import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { Loader2Icon } from "lucide-react";
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
    iconPosition: "start",
  },
});

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
      isActive?: boolean; // Only for if it's needed to manually enforce active state style
      readOnly?: boolean;
      loading?: boolean;
      icon?: React.ReactNode;
      iconOnly?: boolean;
    }
>(
  (
    {
      className,
      variant,
      size,
      isActive,
      readOnly = false,
      loading = false,
      rounded,
      iconPosition,
      asChild = false,
      icon,
      iconOnly,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            rounded,
            iconPosition,
            className,
          }),
          icon != null && children == null && iconOnly ? styles.iconOnly : "",
          isActive ? "isActive" : "",
          readOnly ? styles.readOnly : ""
        )}
        ref={ref}
        {...props}
      >
        {loading ? (
          <div className={styles.loadingIconWrap}>
            <Loader2Icon
              className={cn(
                styles.loadingIcon,
                "block shrink-0 origin-center animate-spin"
              )}
            />
          </div>
        ) : (
          icon
        )}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
