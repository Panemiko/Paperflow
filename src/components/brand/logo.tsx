import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function Logo({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span className={cn("text-2xl font-bold", className)} {...props}>
      Paperflow
    </span>
  );
}
