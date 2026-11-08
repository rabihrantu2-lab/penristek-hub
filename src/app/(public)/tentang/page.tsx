import type { Metadata } from "next";
import { BookOpen, Eye, Target } from "lucide-react";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Tentang Kami | PENRISTEK Hub",
  description: "Sejarah singkat, visi, dan misi UKM PENRISTEK UT Bogor.",
};

// TEKS CONTOH — ganti dengan isi resmi dari pengurus.
const sejarah = [
  "UKM PENRISTEK (Pendidikan, Riset, dan Teknologi) UT Bogor dibentuk sebagai wadah bagi mahasiswa Universitas Terbuka Bogor untuk mengembangkan minat dan bakat di bidang pendidikan, riset, dan teknologi.",
  "Sejak berdiri, PENRISTEK aktif menyelenggarakan diskusi, pelatihan, dan kegiatan kolaboratif yang mendorong mahasiswa untuk berpikir kritis, berkarya, dan bermanfaat bagi lingkungan sekitar.",
  "Kini, di bawah Kabinet Ganesha Aksara, PENRISTEK melanjutkan semangat tersebut dengan program kerja yang lebih terarah, terbuka, dan transparan.",
];

const misi = [
  "Menyelenggarakan kegiatan pendidikan dan pengembangan diri yang bermanfaat bagi anggota.",
  "Mendorong budaya riset dan inovasi teknologi di lingkungan mahasiswa UT Bogor.",
  "Membangun kolaborasi dengan organisasi mahasiswa dan pihak eksternal.",
  "Mengelola organisasi secara profesional, akuntabel, dan transparan, termasuk dalam pengelolaan kas.",
];

export default function TentangPage() {
  return (
    <>
      <section className="bg-brand-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-semibold text-accent-300">Tentang Kami</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            UKM PENRISTEK UT Bogor
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-100">
            Ruang bertumbuh, berkolaborasi, dan berkarya dalam pendidikan, riset, dan teknologi.
            Kabinet Ganesha Aksara.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Card className="sm:!p-8">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <BookOpen size={22} aria-hidden="true" />
            </span>
            <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">Sejarah Singkat</h2>
          </div>
          <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted">
            {sejarah.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="sm:!p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-accent-100 text-accent-700">
                <Eye size={22} aria-hidden="true" />
              </span>
              <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">Visi</h2>
            </div>
            <p className="mt-5 text-lg font-medium leading-8 text-brand-900">
              Menjadi wadah mahasiswa UT Bogor yang unggul, inovatif, dan berintegritas dalam
              pendidikan, riset, dan teknologi.
            </p>
          </Card>

          <Card className="sm:!p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <Target size={22} aria-hidden="true" />
              </span>
              <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">Misi</h2>
            </div>
            <ol className="mt-5 space-y-4">
              {misi.map((m, i) => (
                <li key={m} className="flex gap-3 text-base leading-7 text-muted">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand-900 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  {m}
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </>
  );
}
