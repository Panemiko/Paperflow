import { getDictionary, Locale } from "@/dictionaries";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";
import { Bitter, Inter, JetBrains_Mono } from "next/font/google"; // Fonts moved here

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
});
const _jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${_inter.variable} ${_bitter.variable} ${_jetbrains.variable} font-sans antialiased relative overflow-x-hidden`}
      >
        <div className="relative min-h-screen">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
