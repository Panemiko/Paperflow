"use client";

import { BrandLogo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
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
import { ReactNode, useState } from "react";

const docs = [
  {
    id: "services",
    label: "Services Agreement",
    branches: ["base", "draft-v2"],
    href: "/demo/insights",
    editorHref: "/demo",
  },
  {
    id: "nda",
    label: "NDA — Acme Corp.",
    branches: ["base"],
    href: null,
    editorHref: null,
  },
  {
    id: "employment",
    label: "Employment Contract — J. Reed",
    branches: ["base", "review"],
    href: null,
    editorHref: null,
  },
  {
    id: "privacy",
    label: "Privacy Policy v2.1",
    branches: ["base"],
    href: null,
    editorHref: null,
  },
];

const sharedDocs = [
  { id: "sla", label: "SLA — Marcos Silva", initial: "M", color: "emerald" },
  { id: "vendor", label: "Vendor Agreement Draft", initial: "A", color: "violet" },
];

export default function DemoLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isInsights = pathname.includes("/insights");
  const isEditor = !isInsights;

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    services: true,
  });

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

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
              <span>Home</span>
            </div>
          </Link>
          <div className="px-3 py-2 rounded-sm flex items-center gap-3 text-sm text-foreground hover:bg-muted/50 transition-colors cursor-pointer">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span>Notifications</span>
          </div>
        </div>

        {/* Documents Section */}
        <div className="flex-1 overflow-y-auto px-3 mt-2 space-y-5 pb-4">
          {/* Your Documents */}
          <div>
            <div className="px-3 mb-2">
              <span className="text-xs text-muted-foreground">Your documents</span>
            </div>

            <div className="space-y-0.5">
              {docs.map((doc) => {
                const isOpen = !!expanded[doc.id];
                const isActive = doc.id === "services";

                return (
                  <div key={doc.id}>
                    {/* Document row */}
                    <div
                      className={cn(
                        "px-3 py-2 flex items-center justify-between text-sm cursor-pointer hover:bg-muted/50 rounded-sm transition-colors",
                        isActive
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      )}
                      onClick={() => toggle(doc.id)}
                    >
                      <span className="truncate pr-2">{doc.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
                          isOpen ? "rotate-0" : "-rotate-90"
                        )}
                      />
                    </div>

                    {/* Expandable branches */}
                    {isOpen && (
                      <div className="pl-7 pr-2 py-0.5 space-y-0.5 relative before:absolute before:left-[21px] before:top-0 before:bottom-2 before:w-px before:bg-border">
                        {doc.branches.map((branch) => {
                          const isEditorBranch = branch === "base" && isActive;
                          return (
                            <div key={branch} className="relative">
                              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-px bg-border" />
                              {isActive && doc.editorHref ? (
                                <Link href={isEditorBranch ? doc.editorHref : doc.href ?? "#"}>
                                  <div
                                    className={cn(
                                      "px-3 py-1.5 rounded-sm text-sm transition-colors",
                                      isEditorBranch && isEditor
                                        ? "bg-muted text-foreground"
                                        : "text-muted-foreground hover:bg-muted/50"
                                    )}
                                  >
                                    {branch}
                                  </div>
                                </Link>
                              ) : (
                                <div className="px-3 py-1.5 rounded-sm text-sm text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
                                  {branch}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="px-3 py-2 mt-1 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add new</span>
              </div>
            </div>
          </div>

          {/* Shared with me */}
          <div>
            <div className="px-3 mb-2">
              <span className="text-xs text-muted-foreground">Shared with me</span>
            </div>
            <div className="space-y-0.5">
              {sharedDocs.map((doc) => {
                const isOpen = !!expanded[doc.id];
                return (
                  <div key={doc.id}>
                    <div
                      className="px-3 py-2 flex items-center gap-3 text-sm text-muted-foreground cursor-pointer hover:bg-muted/50 rounded-sm transition-colors"
                      onClick={() => toggle(doc.id)}
                    >
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full flex items-center justify-center shrink-0",
                          doc.color === "emerald"
                            ? "bg-emerald-500/20"
                            : "bg-violet-500/20"
                        )}
                      >
                        <span
                          className={cn(
                            "text-[8px] font-bold",
                            doc.color === "emerald"
                              ? "text-emerald-600"
                              : "text-violet-600"
                          )}
                        >
                          {doc.initial}
                        </span>
                      </div>
                      <span className="truncate flex-1">{doc.label}</span>
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
                          isOpen ? "rotate-0" : "-rotate-90"
                        )}
                      />
                    </div>

                    {isOpen && (
                      <div className="pl-7 pr-2 py-0.5 space-y-0.5 relative before:absolute before:left-[21px] before:top-0 before:bottom-2 before:w-px before:bg-border">
                        <div className="relative">
                          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-px bg-border" />
                          <div className="px-3 py-1.5 rounded-sm text-sm text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
                            base
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t-[0.5px] border-border">
          <div className="flex items-center justify-between px-2 py-2 rounded-sm hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 truncate">
              <div className="w-8 h-8 rounded-sm overflow-hidden border border-border shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&q=90"
                  alt="Elena Vasquez"
                  className="w-full h-full object-cover"
                />
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
