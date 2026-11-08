import { BrandLogos } from "./BrandLogos";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const socialClass = "inline-flex min-h-12 items-center gap-3 rounded-xl bg-white px-5 text-sm font-semibold text-brand-950 shadow-lg shadow-black/20 motion-safe:transition hover:-translate-y-0.5 hover:bg-accent-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400";

  return (
    <footer className="border-t border-white/10 bg-brand-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-lg">
            <div className="mb-5">
              <BrandLogos size="footer" />
            </div>
            <p className="font-display text-lg font-semibold">PENRISTEK UT Bogor</p>
            <p className="mt-2 text-sm font-medium text-accent-300">Kabinet Ganesha Aksara</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-emerald-100">Ruang bertumbuh, berkolaborasi, dan berkarya dalam pendidikan, riset, dan teknologi.</p>
          </div>

          <div>
            <p className="text-sm font-semibold">Terhubung dengan PENRISTEK</p>
            <div className="mt-3 flex flex-wrap gap-3">
            <a href="https://www.instagram.com/ukmpenristek.ut/" target="_blank" rel="noopener noreferrer" aria-label="Instagram PENRISTEK, buka tab baru" className={socialClass}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="url(#ig-gradient)" strokeWidth="1.9" aria-hidden="true">
                <defs>
                  <linearGradient id="ig-gradient" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#FEDA75" />
                    <stop offset="0.35" stopColor="#FA7E1E" />
                    <stop offset="0.65" stopColor="#D62976" />
                    <stop offset="1" stopColor="#4F5BD5" />
                  </linearGradient>
                </defs>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="#D62976" stroke="none" />
              </svg>
              @ukmpenristek.ut
              <ArrowUpRight size={16} aria-hidden="true" className="text-brand-700" />
            </a>
            <a href="https://www.tiktok.com/@ukmpenristek.ut" target="_blank" rel="noopener noreferrer" aria-label="TikTok PENRISTEK, buka tab baru" className={socialClass}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#000" aria-hidden="true">
                <path d="M16.6 3c.3 2.4 1.7 4 4 4.2v3.1c-1.5.1-2.9-.4-4-1.1v6.2c0 3.5-2.4 6-5.7 6-3.1 0-5.5-2.4-5.5-5.5 0-3.4 2.9-5.9 6.3-5.4v3.2c-1.5-.4-3 .6-3 2.2 0 1.2.9 2.2 2.2 2.2 1.4 0 2.3-1 2.3-2.5V3h3.4Z" />
              </svg>
              @ukmpenristek.ut
              <ArrowUpRight size={16} aria-hidden="true" className="text-brand-700" />
            </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs leading-6 text-emerald-100 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} UKM PENRISTEK UT Bogor. Hak cipta dilindungi.</p>
          <Link href="/transparansi" className="inline-flex min-h-11 items-center gap-2 self-start rounded-lg hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400">
            Transparansi Kas <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
