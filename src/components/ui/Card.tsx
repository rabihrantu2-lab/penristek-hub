import type { ComponentPropsWithoutRef } from "react";

export type CardProps = ComponentPropsWithoutRef<"div">;

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={[
        "min-w-0 rounded-2xl border border-line bg-surface p-5 shadow-soft sm:p-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
