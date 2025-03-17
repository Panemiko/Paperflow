import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { type ReactNode } from "react";
import { AppSidebar } from "./sidebar/app-sidebar";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="bg-accent h-fit">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
