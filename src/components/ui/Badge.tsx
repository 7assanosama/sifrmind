import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-medium rounded-full whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "bg-surface-card border border-border text-text-secondary",
        brand:
          "bg-brand-soft text-brand border border-border-active",
        success:
          "bg-success/10 text-success border border-success/20",
      },
      size: {
        sm: "h-6 px-2.5 text-[11px]",
        md: "h-7 px-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  children,
  variant,
  size,
  className,
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))}>
      {children}
    </span>
  );
}
