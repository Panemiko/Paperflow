import { Separator } from "@/components/ui/separator";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-accent flex min-h-screen items-center justify-center">
      <div className="bg-background border-border shadow-border flex w-full max-w-5xl gap-16 rounded-xl border px-12 py-16 shadow-2xl">
        <div className="flex w-full max-w-[18rem] flex-col justify-between gap-20">
          <span className="text-primary text-5xl font-medium">Paperflow</span>
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
