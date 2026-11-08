import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengurus | PENRISTEK Hub",
  description: "Susunan Badan Pengurus Harian UKM PENRISTEK UT Bogor, Kabinet Ganesha Aksara.",
};

type Pengurus = { nama: string; jabatan: string; jobdesk: string };

// Anggota 2 dan 5–15 masih data contoh — ganti dengan data resmi.
const pengurus: Pengurus[] = [
  {
    nama: "Muhamad Dede Sehrial Waluyo",
    jabatan: "Ketua UKM",
    jobdesk: "Memimpin organisasi, mengoordinasikan seluruh bidang, dan mengambil keputusan strategis.",
  },
  {
    nama: "Nama Wakil Ketua",
    jabatan: "Wakil Ketua",
    jobdesk:
      "Membantu tugas Ketua, mengawasi kinerja divisi, dan mengambil alih tanggung jawab saat Ketua berhalangan.",
  },
  {
    nama: "La Mushisyari Rabih Rantu",
    jabatan: "Bendahara",
    jobdesk: "Mengelola keuangan, mencatat arus kas masuk/keluar, dan menyusun laporan transparansi kas.",
  },
  {
    nama: "Aisyah Rahanur Putri",
    jabatan: "Divisi Media",
    jobdesk: "Mengelola sosial media (Instagram & TikTok), membuat konten kreatif, dan dokumentasi kegiatan.",
  },
  {
    nama: "Nama Anggota 5",
    jabatan: "Sekretaris",
    jobdesk: "Mengelola administrasi, surat-menyurat, dan notulensi rapat organisasi.",
  },
  {
    nama: "Nama Anggota 6",
    jabatan: "Wakil Sekretaris",
    jobdesk: "Membantu tugas Sekretaris serta mengarsipkan dokumen dan data keanggotaan.",
  },
  {
    nama: "Nama Anggota 7",
    jabatan: "Wakil Bendahara",
    jobdesk: "Membantu Bendahara dalam pencatatan kas dan penagihan iuran anggota.",
  },
  {
    nama: "Nama Anggota 8",
    jabatan: "Koordinator Divisi Acara",
    jobdesk: "Merancang, menyusun rundown, dan mengoordinasikan pelaksanaan seluruh kegiatan.",
  },
  {
    nama: "Nama Anggota 9",
    jabatan: "Divisi Acara",
    jobdesk: "Mendukung persiapan teknis, perlengkapan, dan jalannya acara di lapangan.",
  },
  {
    nama: "Nama Anggota 10",
    jabatan: "Koordinator Divisi Riset",
    jobdesk: "Memimpin kajian dan diskusi ilmiah serta mendorong karya tulis anggota.",
  },
  {
    nama: "Nama Anggota 11",
    jabatan: "Divisi Riset",
    jobdesk: "Mengumpulkan bahan kajian, menyusun materi diskusi, dan membantu penelitian.",
  },
  {
    nama: "Nama Anggota 12",
    jabatan: "Divisi Teknologi",
    jobdesk: "Mengelola website dan perangkat digital organisasi, serta mendukung kebutuhan teknis.",
  },
  {
    nama: "Nama Anggota 13",
    jabatan: "Divisi Humas",
    jobdesk: "Menjalin komunikasi dan kerja sama dengan organisasi mahasiswa serta pihak eksternal.",
  },
  {
    nama: "Nama Anggota 14",
    jabatan: "Divisi Keanggotaan",
    jobdesk: "Mendata anggota, membina keaktifan, dan menyelenggarakan kegiatan kekeluargaan.",
  },
  {
    nama: "Nama Anggota 15",
    jabatan: "Divisi Dokumentasi",
    jobdesk: "Mendokumentasikan foto dan video kegiatan serta mengelola arsip visual organisasi.",
  },
];

// Warna soft bergantian untuk area inisial.
const warna = [
  "bg-emerald-100 text-emerald-700",
  "bg-sky-100 text-sky-700",
  "bg-accent-100 text-accent-700",
  "bg-teal-100 text-teal-700",
];

function inisial(nama: string) {
  return nama
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function PengurusPage() {
  return (
    <>
      <section className="bg-brand-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <p className="text-sm font-semibold text-accent-300">Kabinet Ganesha Aksara</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Badan Pengurus Harian
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-emerald-100">
            Kenali para pengurus UKM PENRISTEK UT Bogor beserta tugas dan tanggung jawabnya.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <ul className="grid gap-5 lg:grid-cols-2">
          {pengurus.map((p, i) => (
            <li
              key={p.nama}
              className="flex flex-col gap-5 rounded-3xl border border-line bg-surface p-4 shadow-soft motion-safe:transition motion-safe:duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:flex-row sm:p-5"
            >
              <div
                aria-hidden="true"
                className={`grid h-40 shrink-0 place-items-center rounded-2xl text-5xl font-extrabold tracking-tight sm:h-auto sm:min-h-44 sm:w-40 ${warna[i % warna.length]}`}
              >
                {inisial(p.nama)}
              </div>
              <div className="min-w-0 flex-1 py-1 sm:pr-1">
                <h2 className="text-lg font-bold leading-snug text-brand-900">{p.nama}</h2>
                <p className="mt-2 inline-block rounded-full bg-brand-900 px-3 py-1 text-xs font-semibold text-white">
                  {p.jabatan}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-700">Jobdesk</p>
                <p className="mt-1.5 text-sm leading-6 text-muted">{p.jobdesk}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
