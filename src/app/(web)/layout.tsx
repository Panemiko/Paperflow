import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { VerticalGuidelines } from "@/components/ui/vertical-guidelines";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 pointer-events-none bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,107,95,0.15)_0,rgba(0,107,95,0)_50%,rgba(0,107,95,0)_100%)]" />
      <div className="fixed inset-0 -z-10 pointer-events-none [background:radial-gradient(125%_125%_at_50%_10%,transparent_40%,rgba(0,107,95,0.08)_100%)]" />
      <VerticalGuidelines />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
