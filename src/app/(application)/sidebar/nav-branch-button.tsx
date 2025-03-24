"use client";

import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavBranchButton({
  href,
  isMain,
  name,
}: {
  href: string;
  name: string;
  isMain?: boolean;
}) {
  const pathname = usePathname();
  const isSelected = pathname === href;

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton
        className={cn(
          "rounded-lg transition-colors",
          isSelected && isMain ? "bg-primary/10 hover:bg-primary/30" : "",
          isSelected && !isMain ? "bg-foreground/5 hover:bg-foreground/20" : "",
        )}
        asChild
      >
        <Link href={href} className="flex items-center">
          <span>{name}</span>
          {isMain && (
            <span className="text-primary ml-auto text-xs">principal</span>
          )}
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
