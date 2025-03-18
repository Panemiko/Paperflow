import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

export function CustomLink({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "text-primary/80 hover:text-primary transition-colors",
        className,
      )}
    />
  );
}
