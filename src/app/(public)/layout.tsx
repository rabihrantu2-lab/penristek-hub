import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <a href="#main-content" className="sr-only z-[60] rounded-xl bg-accent-400 px-4 py-3 font-semibold text-brand-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Langsung ke konten</a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
