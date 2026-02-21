import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { VerticalGuidelines } from "@/components/ui/vertical-guidelines";
import { getDictionary, Locale } from "@/dictionaries";

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,107,95,0.15)_0,rgba(0,107,95,0)_50%,rgba(0,107,95,0)_100%)]" />
      <div className="fixed inset-0 -z-10 pointer-events-none [background:radial-gradient(125%_125%_at_50%_10%,transparent_40%,rgba(0,107,95,0.08)_100%)]" />
      <VerticalGuidelines />
      <Header dict={dict.header} lang={locale} />
      {children}
      <Footer dict={dict.footer} lang={locale} />
    </>
  );
}
