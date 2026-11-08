import Link from "next/link";
import { ArrowRight, Calendar, Users, Wallet, type LucideIcon } from "lucide-react";

type MenuItem = { title: string; description: string; href: string; icon: LucideIcon };

const menu: MenuItem[] = [
  {
    title: "Program UKM",
    description: "Temukan jadwal dan informasi kegiatan pendidikan, riset, dan teknologi UKM PENRISTEK.",
    href: "/program",
    icon: Calendar,
  },
  {
    title: "Pengurus",
    description: "Kenali tim Badan Pengurus Harian di balik Kabinet Ganesha Aksara beserta tugasnya.",
    href: "/pengurus",
    icon: Users,
  },
  {
    title: "Transparansi Kas",
    description: "Lihat laporan pemasukan dan pengeluaran kas yang dipublikasikan secara terbuka.",
    href: "/transparansi",
    icon: Wallet,
  },
];

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400";
const btn =
  "inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl px-8 text-base font-bold motion-safe:transition-all motion-safe:duration-200 sm:w-auto";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="home-title"
        className="relative isolate overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 text-white"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-20 -top-28 size-96 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="absolute -bottom-32 right-0 size-[28rem] rounded-full bg-accent-400/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <p className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-accent-300">
              Kabinet Ganesha Aksara
            </p>
            <h1 id="home-title" className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Wadah Kolaborasi &amp; <span className="text-accent-300">Inovasi</span> Mahasiswa UT Bogor
            </h1>
            <p className="max-w-2xl text-base leading-8 text-emerald-100 sm:text-lg">
              Ruang informasi UKM Pendidikan, Riset, dan Teknologi Universitas Terbuka Bogor untuk bertumbuh,
              berkolaborasi, dan berkarya bersama.
            </p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Link
                href="/program"
                className={`${btn} bg-accent-400 text-brand-950 shadow-lg shadow-black/20 hover:-translate-y-0.5 hover:bg-accent-300 ${focusRing}`}
              >
                Jelajahi Program <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link
                href="/tentang"
                className={`${btn} border-2 border-white/40 text-white hover:bg-white/10 ${focusRing}`}
              >
                Tentang Kami
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section aria-label="Menu utama" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
          {menu.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${focusRing} focus-visible:outline-brand-700`}
            >
              <div className="mb-6 w-fit rounded-xl bg-green-100 p-4 text-green-700">
                <Icon size={28} aria-hidden="true" />
              </div>
              <h2 className="mb-3 text-xl font-bold text-gray-800">{title}</h2>
              <p className="text-sm leading-relaxed text-gray-600">{description}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-green-700">
                Pelajari Selengkapnya
                <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
