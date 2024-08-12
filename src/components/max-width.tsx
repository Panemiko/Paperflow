import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

export function MaxWidth({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("mx-auto max-w-[1350px] px-10", className)} {...props} />
  );
}
