import { BrandLogo } from "@/components/brand/logo";
import Link from "next/link";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="from-primary to-primary/50 min-h-screen w-screen bg-gradient-to-br">
      <main className="flex h-screen w-full items-center justify-center">
        <div className="bg-card border-border flex min-h-[80vh] w-full max-w-xl flex-col justify-between rounded-xl border-r px-8 py-14">
          <header>
            <BrandLogo className="w-64" />
          </header>
          <div>{children}</div>
          <footer className="flex flex-col items-center gap-1">
            <span className="text-foreground/70 text-sm">
              Paperflow &copy; {new Date().getFullYear()}
            </span>
            <div className="space-x-2">
              <Link
                href="/tos"
                className="text-foreground/70 text-sm hover:underline"
              >
                Termos de uso
              </Link>
              <Link
                href="/privacy"
                className="text-foreground/70 text-sm hover:underline"
              >
                Política de privacidade
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
