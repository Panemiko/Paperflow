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
import { NavPapers } from "./nav-papers";
import { UserDisplay } from "./user-display";

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: { name: string; email: string; image?: string | null; id: string };
}) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <Link href={"/overview"}>
          <BrandLogo className="mt-4 mb-4 ml-1 h-fit w-32" />
        </Link>
        <NavMain />
      </SidebarHeader>
      <SidebarContent className="py-8">
        <NavPapers />
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
