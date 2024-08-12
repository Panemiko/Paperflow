import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

export function CustomLink({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      className={cn(
        "font-medium text-primary transition-colors hover:text-primary/90",
        className,
      )}
      {...props}
    />
  );
}
