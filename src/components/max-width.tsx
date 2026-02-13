import { cn } from "@/lib/utils";
import React from "react";

interface MaxWidthProps {
  children: React.ReactNode;
  className?: string;
}

export function MaxWidth({ children, className }: MaxWidthProps) {
  return (
    <div className={cn("max-w-7xl mx-auto px-6 lg:px-12", className)}>
      {children}
    </div>
  );
}
