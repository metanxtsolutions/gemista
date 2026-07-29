import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline-light";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--color-gold-500)]";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ink-900 text-cream hover:bg-ink-800 active:scale-[0.98] shadow-soft",
  secondary:
    "bg-transparent text-ink-900 border border-ink-900 hover:bg-ink-900 hover:text-cream active:scale-[0.98]",
  ghost: "bg-transparent text-ink-900 hover:bg-ivory active:scale-[0.98]",
  "outline-light":
    "bg-transparent text-paper border border-paper/70 hover:bg-paper hover:text-ink-900 active:scale-[0.98]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-base",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
