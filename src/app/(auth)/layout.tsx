import { Logo } from "@/components/brand/logo";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="from-primary to-primary/50 min-h-screen w-screen bg-gradient-to-br">
      <main className="h-full w-full">
        <div className="bg-card border-border flex h-screen w-full max-w-lg flex-col justify-between border-r px-8 py-14">
          <header>
            <Logo />
          </header>
          <div>{children}</div>
          <footer className="text-foreground/70 text-sm">
            Paperflow &copy; {new Date().getFullYear()}
          </footer>
        </div>
      </main>
    </div>
  );
}
