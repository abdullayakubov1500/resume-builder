import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "plain" | "destructive";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium min-h-[44px] px-5 text-[17px] sm:text-[15px] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tint)] active:opacity-70";

const variants: Record<Variant, string> = {
  primary: "bg-[var(--tint)] text-white",
  secondary: "bg-[var(--fill-tertiary)] text-[var(--tint)]",
  plain: "bg-transparent text-[var(--tint)] min-h-[44px] px-3",
  destructive: "bg-transparent text-[var(--destructive)] min-h-[44px] px-3",
};

export function AppleButton({
  variant = "secondary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
