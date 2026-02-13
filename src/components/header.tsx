"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="py-4 px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-foreground flex items-center justify-center">
            <span className="font-serif text-background text-lg font-bold">
              P
            </span>
          </div>
          <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
            Paperflow
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Mechanism", href: "#mechanism" },
            { label: "Philosophy", href: "#philosophy" },
            { label: "Ethics", href: "#ethics" },
            { label: "FAQ", href: "#faq" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <Button asChild className="group">
            <a href="#waitlist">
              Join Waitlist
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
