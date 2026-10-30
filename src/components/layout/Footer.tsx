import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-brand-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-lg">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-14 place-items-center rounded-xl bg-white p-2">
                <Image src="/brand/logo-penristek.png" alt="Logo UKM PENRISTEK UT Bogor" width={48} height={48} className="size-full object-contain" />
              </span>
              <span className="grid size-12 place-items-center rounded-xl bg-white p-2">
                <Image src="/brand/logo-ut.png" alt="Logo Universitas Terbuka" width={40} height={40} className="size-full object-contain" />
              </span>
            </div>
            <p className="font-display text-lg font-semibold">PENRISTEK UT Bogor</p>
            <p className="mt-2 text-sm font-medium text-accent-300">Kabinet Ganesha Aksara</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-emerald-100">Ruang bertumbuh, berkolaborasi, dan berkarya dalam pendidikan, riset, dan teknologi.</p>
          </div>

          <div>
            <p className="text-sm font-semibold">Terhubung dengan PENRISTEK</p>
            <a href="https://www.instagram.com/ukmpenristek.ut/" target="_blank" rel="noopener noreferrer" aria-label="Instagram PENRISTEK, buka tab baru" className="mt-3 inline-flex min-h-11 items-center gap-3 rounded-xl border border-white/20 px-4 text-sm text-emerald-50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              @ukmpenristek.ut
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
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
