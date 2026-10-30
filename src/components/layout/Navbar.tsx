"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "Profil", href: "/#profil" },
  { label: "Program", href: "/program" },
  { label: "Pengurus", href: "/pengurus" },
  { label: "Transparansi Kas", href: "/transparansi" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    const desktop = window.matchMedia("(min-width: 1280px)");
    function onBreakpointChange(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onBreakpointChange);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, [open]);

  function isActive(href: string) {
    return !href.includes("#") &&
      (pathname === href || pathname.startsWith(`${href}/`));
  }

  const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400";
  const cta = `inline-flex min-h-11 items-center justify-center rounded-xl bg-accent-400 px-4 text-sm font-semibold text-brand-950 hover:bg-accent-300 motion-safe:transition-colors ${focus}`;

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-white/10 bg-brand-900/95 text-white backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={() => setOpen(false)} aria-label="PENRISTEK UT Bogor — Beranda" className={`flex min-w-0 items-center gap-3 rounded-lg ${focus}`}>
          <span className="flex shrink-0 items-center gap-2" aria-hidden="true">
            <span className="grid size-11 place-items-center rounded-xl bg-white p-1">
              <Image src="/brand/logo-penristek.png" alt="" width={40} height={40} className="size-full object-contain" />
            </span>
            <span className="grid size-9 place-items-center rounded-lg bg-white p-1">
              <Image src="/brand/logo-ut.png" alt="" width={32} height={32} className="size-full object-contain" />
            </span>
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block font-display text-sm font-bold tracking-tight sm:text-base">PENRISTEK</span>
            <span className="mt-1 block text-xs font-medium text-emerald-100">UT Bogor</span>
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-2 xl:flex">
          {navigation.map(({ label, href }) => (
            <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium motion-safe:transition-colors hover:bg-white/10 hover:text-white ${isActive(href) ? "bg-white/10 text-white" : "text-emerald-50/90"} ${focus}`}>
              {label}
            </Link>
          ))}
          <Link href="/transparansi" className={`ml-3 ${cta}`}>Transparansi</Link>
        </nav>

        <button ref={toggleRef} type="button" aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"} aria-expanded={open} aria-controls="public-mobile-navigation" onClick={() => setOpen(!open)} className={`grid size-11 shrink-0 place-items-center rounded-xl border border-white/20 hover:bg-white/10 xl:hidden ${focus}`}>
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      <nav id="public-mobile-navigation" aria-label="Navigasi mobile" hidden={!open} className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-white/10 bg-brand-900 xl:hidden">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
          {navigation.map(({ label, href }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={isActive(href) ? "page" : undefined} className={`flex min-h-12 items-center rounded-xl px-4 text-sm font-medium hover:bg-white/10 ${isActive(href) ? "bg-white/10 text-white" : "text-emerald-50"} ${focus}`}>
              {label}
            </Link>
          ))}
          <Link href="/transparansi" onClick={() => setOpen(false)} className={`mt-3 ${cta}`}>Transparansi</Link>
        </div>
      </nav>
    </header>
  );
}
