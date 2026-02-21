"use client";

import { BrandLogo } from "@/components/brand/logo";
import {
  Bell,
  ChevronDown,
  FileText,
  Home,
  MoreVertical,
  Plus,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function DemoLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Create links that look like the document tree in the user's design image
  const isInsights = pathname.includes("/insights");
  const isEditor = !isInsights;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <nav className="w-64 border-r-[0.5px] border-border bg-white dark:bg-card hidden flex-col shrink-0 z-10 md:flex">
        {/* Logo */}
        <div className="h-14 px-6 flex items-center gap-2 border-b border-transparent shrink-0 mt-2">
          <BrandLogo width={110} height={24} className="h-6 w-auto" />
        </div>

        {/* Main Nav Items */}
        <div className="px-3 py-4 space-y-1">
          <Link href="/demo">
            <div className="px-3 py-2 rounded-sm flex items-center gap-3 text-sm text-foreground hover:bg-muted/50 transition-colors">
              <Home className="w-4 h-4 text-muted-foreground" />
              <span>Início</span>
            </div>
          </Link>
          <div className="px-3 py-2 rounded-sm flex items-center gap-3 text-sm text-foreground hover:bg-muted/50 transition-colors cursor-pointer">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span>Notificações</span>
          </div>
        </div>

        {/* Artigos Section */}
        <div className="flex-1 overflow-y-auto px-3 mt-2">
          <div className="px-3 mb-2">
            <span className="text-xs text-muted-foreground">Artigos</span>
          </div>

          <div className="space-y-1 relative">
            {/* Document Title header */}
            <Link href="/demo/insights" className="block">
              <div
                className={`px-3 py-2 flex items-center justify-between text-sm text-foreground font-medium cursor-pointer hover:bg-muted/50 rounded-sm ${isInsights ? "bg-muted" : ""}`}
              >
                <span className="truncate">Contrato de Prestação e...</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </Link>

            {/* Tree items */}
            <div className="pl-7 pr-2 space-y-1 relative before:absolute before:left-[21px] before:top-0 before:bottom-3 before:w-px before:bg-border">
              {/* Branch 1: main (Editor) */}
              <Link href="/demo" className="block relative">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-px bg-border" />
                <div
                  className={`px-3 py-1.5 flex items-center justify-between rounded-sm text-sm transition-colors ${isEditor ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50"}`}
                >
                  <span>base</span>
                  {isInsights && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                      Visão Geral
                    </span>
                  )}
                </div>
              </Link>
            </div>

            <div className="px-3 py-2 mt-2 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              <Plus className="w-4 h-4" />
              <span>Adicionar novo</span>
            </div>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t-[0.5px] border-border">
          <div className="flex items-center justify-between px-2 py-2 rounded-sm hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 truncate">
              <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center text-foreground font-medium text-xs font-mono shrink-0">
                EV
              </div>
              <div className="flex flex-col truncate">
                <span className="text-sm font-medium leading-tight truncate">
                  Elena Vasquez
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight truncate">
                  elena@company.com
                </span>
              </div>
            </div>
            <MoreVertical className="w-4 h-4 text-muted-foreground shrink-0" />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#fafafa] dark:bg-background h-screen">
        {/* Mobile Nav Top Bar */}
        <div className="md:hidden h-14 border-b-[0.5px] border-border bg-card flex items-center px-4 shrink-0 shadow-sm z-10">
          <div className="mr-auto">
            <BrandLogo width={90} height={20} className="h-5 w-auto" />
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/demo"
              className={`p-2 rounded-sm ${isEditor ? "bg-muted text-foreground" : "text-muted-foreground"}`}
            >
              <FileText className="w-4 h-4" />
            </Link>
            <Link
              href="/demo/insights"
              className={`p-2 rounded-sm ${isInsights ? "bg-muted text-foreground" : "text-muted-foreground"}`}
            >
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-auto w-full relative">{children}</div>
      </main>
    </div>
  );
}
