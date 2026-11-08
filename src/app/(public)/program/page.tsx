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
  { tanggal: "15 Nov", judul: "Rapat / Pematangan Acara", status: "Segera ditentukan" },
  { tanggal: "22 Nov", judul: "Proker" },
  { tanggal: "29 Nov", judul: "UAS & Agenda Free" },
];

export default function ProgramPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-16 sm:px-6">
      <header className="pb-8">
        <p className="text-sm font-semibold text-green-700">Program Kerja</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Jadwal November</h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-gray-600">
          Agenda kegiatan UKM PENRISTEK UT Bogor per minggu. Jadwal dapat berubah sewaktu-waktu.
        </p>
      </header>

      <div className="relative pl-12">
        {/* Garis vertikal: pusatnya di x = 18px, sejajar dengan titik */}
        <div aria-hidden="true" className="absolute bottom-0 left-4 top-0 border-l-4 border-green-200" />

        <ol className="space-y-6">
          {agenda.map((a) => (
            <li key={a.tanggal} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[38px] top-7 size-4 rounded-full bg-green-600 ring-4 ring-green-100"
              />
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-colors hover:border-green-300">
                <div className="flex flex-wrap items-center gap-2">
                  <time className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                    {a.tanggal}
                  </time>
                  {a.status && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                      {a.status}
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-lg font-bold text-gray-800">{a.judul}</h2>
                {a.keterangan && <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{a.keterangan}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

