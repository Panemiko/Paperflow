"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BrandLogo } from "./brand/logo";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="py-4 px-12 flex items-center">
        <div className="flex-1 flex justify-start">
          <BrandLogo className="h-8 w-auto" />
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
        <div className="flex-1 flex justify-end">
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
