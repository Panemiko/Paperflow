"use client";

import { Home, Inbox } from "lucide-react";
import * as React from "react";

import { BrandLogo } from "@/components/brand/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavWorkspaces } from "./nav-workspaces";
import { UserDisplay } from "./user-display";

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: { name: string; email: string; image?: string | null; id: string };
}) {
  const data = {
    navMain: [],
    workspaces: [
      {
        name: "Personal Life Management",
        emoji: "🏠",
        pages: [
          {
            name: "Daily Journal & Reflection",
            url: "#",
            emoji: "📔",
          },
          {
            name: "Health & Wellness Tracker",
            url: "#",
            emoji: "🍏",
          },
          {
            name: "Personal Growth & Learning Goals",
            url: "#",
            emoji: "🌟",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <Link href={"/overview"}>
          <BrandLogo className="mt-4 mb-4 ml-1 h-fit w-32" />
        </Link>
        <NavMain
          items={[
            {
              title: "Início",
              url: "/overview",
              icon: Home,
            },
            {
              title: "Notificações",
              url: "/notifications",
              icon: Inbox,
            },
          ]}
        />
      </SidebarHeader>
      <SidebarContent className="py-8">
        <NavWorkspaces workspaces={data.workspaces} />
        <div className="px-4">
          <SidebarSeparator />
        </div>
        <div className="mt-auto space-y-2 px-4">
          <UserDisplay user={user} />
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
