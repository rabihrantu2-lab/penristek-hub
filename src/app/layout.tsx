import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PENRISTEK Hub | UKM UT Bogor",
  description:
    "Profil, program, pengurus, dan transparansi kas UKM PENRISTEK UT Bogor — Kabinet Ganesha Aksara.",
  icons: {
    icon: "/brand/logo-penristek.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-svh bg-canvas font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
