import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-accent min-h-screen w-screen">
      <main className="h-full w-full">{children}</main>
    </div>
  );
}
