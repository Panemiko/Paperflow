import { Logo } from "@/components/brand/logo";
import { Separator } from "@/components/ui/separator";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-accent">
      <div className="flex min-h-96 w-full max-w-5xl gap-16 rounded-xl border border-border bg-background px-12 py-16 shadow-2xl shadow-border">
        <div className="flex w-full max-w-[18rem] flex-col justify-between gap-20">
          <Logo />
          <span className="text-foreground/70">
            Paperflow &copy; {new Date().getFullYear()}
          </span>
        </div>
        <div>
          <Separator orientation="vertical" />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
