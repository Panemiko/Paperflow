import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: {
    template: '%s | Paperflow',
    default: 'Paperflow'
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="pt-BR">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
