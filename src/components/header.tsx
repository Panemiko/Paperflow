"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "./brand/logo";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MaxWidth } from "./max-width";

export function Header({ dict, lang }: { dict: any; lang: string }) {
  const [scrolled, setScrolled] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div 
        className={cn(
          "absolute top-0 left-0 right-0 h-20 bg-background transition-opacity duration-500 pointer-events-none",
          scrolled ? "opacity-100" : "opacity-0"
        )} 
      />
 
      <div className="relative flex items-center justify-between p-4 md:p-6">
        <Link href={`/${lang}`} className="pointer-events-auto hover:opacity-80 transition-opacity">
          <BrandLogo className="h-8 w-auto" />
        </Link>

        <div className="flex items-center gap-4 pointer-events-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                {lang === "en" ? "EN" : "PT"}
                <ChevronDown className="w-3 h-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[120px]">
              <DropdownMenuItem asChild>
                <Link
                  href="/en"
                  className="w-full cursor-pointer font-mono text-xs"
                >
                  English
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/pt"
                  className="w-full cursor-pointer font-mono text-xs"
                >
                  Português
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild className="group">
            <a href="#waitlist">
              {dict.join_waitlist}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
