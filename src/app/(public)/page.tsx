import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

const sections = [
  { title: "Program UKM", description: "Temukan informasi kegiatan pendidikan, riset, dan teknologi.", href: "/program" },
  { title: "Pengurus", description: "Kenali tim di balik Kabinet Ganesha Aksara.", href: "/pengurus" },
  { title: "Transparansi Kas", description: "Akses informasi kas yang dipublikasikan pengurus.", href: "/transparansi" },
];

export default function Home() {
  return (
    <section id="profil" aria-labelledby="home-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="text-sm font-semibold text-brand-700">Kabinet Ganesha Aksara</p>
      <h1 id="home-title" className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-brand-900 sm:text-5xl">Selamat Datang di PENRISTEK Hub</h1>
      <p className="mt-6 max-w-2xl text-base leading-7 text-muted">Ruang informasi UKM Pendidikan, Riset, dan Teknologi Universitas Terbuka Bogor.</p>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">Halaman utama sedang dalam tahap pengembangan. Informasi kegiatan, pengurus, dan laporan kas akan dipublikasikan secara bertahap.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {sections.map(section => (
          <Card key={section.href} className="flex flex-col">
            <h2 className="text-xl font-semibold text-brand-900">{section.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-muted">{section.description}</p>
            <Link href={section.href} className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-lg text-sm font-semibold text-brand-900 hover:text-brand-700">Lihat informasi <span className="sr-only">{section.title}</span><ArrowUpRight size={17} aria-hidden="true" /></Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
