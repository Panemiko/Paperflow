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
  title: "Paperflow | Write with Control.",
  description:
    "The infrastructure your ideas deserve. Manage complex documents with absolute precision—branch, merge, and track every version without the chaos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${_inter.variable} ${_bitter.variable} ${_jetbrains.variable} font-sans antialiased relative overflow-x-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
