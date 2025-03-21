import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function MaxWidth({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-20", className)} {...props}>
      {props.children}
    </div>
  );
}
