import * as React from "react";
import { cn } from "../../lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-3xl border border-white/10 bg-white/[0.03] shadow-soft",
        className
      )}
      {...props}
    />
  );
}
