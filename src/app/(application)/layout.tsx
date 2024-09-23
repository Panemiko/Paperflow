import { Icon } from "@/components/brand/icon";
import { MaxWidth } from "@/components/max-width";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { authentication } from "@/server/auth";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { UserDropdown } from "./user-dropdown";

export default async function Layout({ children }: { children: ReactNode }) {
  const { user } = await authentication();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="min-h-screen w-full">
      <aside className="fixed z-50 flex min-h-screen flex-col justify-between gap-6 border-r border-r-border bg-background px-2 py-3">
        <div className="flex flex-col gap-4">
          <Link href="/app">
            <Icon className="h-8 w-8" />
          </Link>
          <Separator />
          <div className="flex flex-col gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <HomeIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Home</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <UserDropdown user={user} />
      </aside>
      <div className="ml-14">
        <MaxWidth>{children}</MaxWidth>
      </div>
    </div>
  );
}
