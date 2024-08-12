import { Icon } from "@/components/brand/icon";
import { MaxWidth } from "@/components/max-width";
import { authentication } from "@/server/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const { user } = await authentication();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="min-h-screen w-full">
      <aside className="fixed bg-background flex h-screen flex-col gap-10 border-r border-r-border px-2 py-6">
        <Link href="/app">
          <Icon className="h-8 w-8" />
        </Link>
      </aside>
      <MaxWidth className="py-14">{children}</MaxWidth>
    </div>
  );
}
