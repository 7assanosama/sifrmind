import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 rounded-full",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-background hover:bg-brand-hover active:bg-brand-active",
        secondary:
          "border border-border text-text-primary bg-transparent hover:border-border-hover hover:bg-surface-card-hover",
        ghost:
          "text-text-secondary hover:text-text-primary hover:bg-surface-card bg-transparent",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-radius-sm",
        md: "h-11 px-6 text-sm rounded-radius-md",
        lg: "h-12 px-8 text-base rounded-radius-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
