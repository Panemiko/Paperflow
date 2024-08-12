import { MaxWidth } from "@/components/max-width";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authentication } from "@/server/auth";
import { PlusIcon } from "lucide-react";
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
    <div className="min-h-screen bg-accent/20">
      <header className="border-b border-b-border">
        <MaxWidth className="flex items-center justify-between py-6">
          <Link href={`/app`} className="group flex items-center gap-5">
            <span className="text-xl font-medium text-primary">Paperflow</span>
          </Link>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-9">
              <Button asChild size="sm">
                <Link href="/forms/create">
                  <PlusIcon /> New
                </Link>
              </Button>
            </div>
            <Separator orientation="vertical" className="h-9 bg-secondary" />
            <UserDropdown user={user} />
          </div>
        </MaxWidth>
      </header>
      <MaxWidth className="py-14">{children}</MaxWidth>
    </div>
  );
}
