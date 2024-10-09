import { Logo } from "@/components/brand/logo";
import { MaxWidth } from "@/components/max-width";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header>
        <MaxWidth>
          <div className="flex w-full justify-center py-6">
            <Logo className="h-10 w-fit" />
          </div>
        </MaxWidth>
      </header>
      <main>{children}</main>
      <footer>
        <MaxWidth></MaxWidth>
      </footer>
    </div>
  );
}
