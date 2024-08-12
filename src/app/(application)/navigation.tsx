"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

export function Navigation({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      className={cn(
        "text-sm transition-colors hover:text-foreground",
        active ? "text-foreground" : "text-foreground/70",
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
