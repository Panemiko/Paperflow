import { VerticalGuidelines } from "@/components/ui/vertical-guidelines";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Bitter, Inter, JetBrains_Mono } from "next/font/google";
import React from "react";

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-bitter",
});
const _jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Paperflow | Versioning the Human Legacy",
  description:
    "Git for Authors. A version control system built for researchers, writers, and original thinkers. AI is optional. Clear distinction between human and AI content.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${_inter.variable} ${_bitter.variable} ${_jetbrains.variable} font-sans antialiased relative`}
      >
        <VerticalGuidelines />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
