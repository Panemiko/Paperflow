"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "./brand/logo";
import { MaxWidth } from "./max-width";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <MaxWidth className="py-4 flex items-center">
        <div className="flex-1 flex justify-start">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <BrandLogo className="h-8 w-auto" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "How it Works", href: "/#how-it-works" },
            { label: "Collaboration", href: "/#collaboration" },
            { label: "The Record", href: "/#result" },
            { label: "Principles", href: "/#refuse" },
            { label: "FAQ", href: "/#faq" },
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
      </MaxWidth>
    </header>
  );
}
