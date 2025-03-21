"use client";

import { HomeIcon, InboxIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain() {
  const pathname = usePathname();

  const items = [
    {
      title: "Início",
      url: "/overview",
      icon: HomeIcon,
    },
    {
      title: "Notificações",
      url: "/notifications",
      icon: InboxIcon,
    },
  ];

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.url === pathname}>
            <Link href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
