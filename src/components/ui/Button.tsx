import type { ComponentPropsWithoutRef } from "react";

const variants = {
  primary: "bg-brand-900 text-white hover:bg-brand-700",
  secondary: "border border-line bg-surface text-brand-900 hover:bg-brand-50",
  accent: "bg-accent-400 text-brand-950 hover:bg-accent-300",
} as const;

const sizes = {
  sm: "min-h-11 px-4 py-2 text-sm",
  md: "min-h-12 px-5 py-3 text-sm",
  lg: "min-h-14 px-6 py-3.5 text-base",
} as const;

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  type = "button",
  className = "",
  children,
  "aria-busy": ariaBusy,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || ariaBusy}
      className={[
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl",
        "font-semibold motion-safe:transition-colors motion-safe:duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="size-4 rounded-full border-2 border-current border-t-transparent motion-safe:animate-spin"
        />
      )}
      {children}
    </button>
  );
}
