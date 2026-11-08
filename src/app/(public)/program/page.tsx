import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program | PENRISTEK Hub",
  description: "Jadwal program kerja UKM PENRISTEK UT Bogor.",
};

type Agenda = { tanggal: string; judul: string; keterangan?: string; status?: string };

const agenda: Agenda[] = [
  { tanggal: "1 Nov", judul: "Diskusi Proker" },
  {
    tanggal: "8 Nov",
    judul: "Acara KWU/LMND di Perpusnas",
    keterangan: "Siang: acara di Perpusnas. Sore: free.",
  },
  {
    tanggal: "15 Nov",
    judul: "Rapat / Pematangan Acara",
    status: "Segera ditentukan",
  },
  { tanggal: "22 Nov", judul: "Proker" },
  { tanggal: "29 Nov", judul: "UAS & Agenda Free" },
];

export default function ProgramPage() {
  return (
    <>
      <section className="bg-brand-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-semibold text-accent-300">Program Kerja</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Jadwal November
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-100">
            Agenda kegiatan UKM PENRISTEK UT Bogor per minggu. Jadwal dapat berubah sewaktu-waktu.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <ol className="relative space-y-8 border-l-2 border-brand-700/20 pl-8 sm:pl-10">
          {agenda.map((a) => (
            <li key={a.tanggal} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[2.6rem] top-5 size-4 rounded-full border-4 border-canvas bg-brand-700 ring-2 ring-brand-700/30 sm:-left-[3.1rem]"
              />
              <div className="rounded-2xl border border-line bg-surface p-5 shadow-soft sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <time className="rounded-full bg-brand-900 px-3 py-1 text-xs font-bold text-white">
                    {a.tanggal}
                  </time>
                  {a.status && (
                    <span className="rounded-full bg-accent-100 px-2.5 py-0.5 text-xs font-semibold text-accent-800">
                      {a.status}
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-lg font-bold text-brand-900">{a.judul}</h2>
                {a.keterangan && <p className="mt-1.5 text-sm leading-6 text-muted">{a.keterangan}</p>}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
