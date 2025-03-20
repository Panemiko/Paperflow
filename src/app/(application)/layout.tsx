import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { AppSidebar } from "./sidebar/app-sidebar";

export default async function Layout({ children }: { children: ReactNode }) {
  const authentication = await auth.api.getSession({
    headers: await headers(),
  });

  if (!authentication?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={authentication.user} />
      <SidebarInset>
        <main className="bg-accent h-fit min-h-screen">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
