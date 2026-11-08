import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Transparansi Kas | PENRISTEK Hub" };

// Data kas berubah sewaktu-waktu; selalu ambil terbaru.
export const dynamic = "force-dynamic";

// Hanya kolom publik yang diambil — tanpa user_id, receipt_url, atau data sensitif lain.
type Row = { id: string | number; date: string; description: string | null; type: string; amount: number };

const INCOME_TYPES = ["income", "pemasukan", "masuk"];
const isIncome = (r: Row) => INCOME_TYPES.includes(r.type.toLowerCase());

const rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });
const tanggal = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" });

export default async function TransparansiPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("id, date, description, type, amount")
    .in("status", ["posted", "published"])
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })
    .returns<Row[]>();

  const rows = data ?? [];
  const masuk = rows.filter(isIncome).reduce((s, r) => s + Number(r.amount), 0);
  const keluar = rows.filter((r) => !isIncome(r)).reduce((s, r) => s + Number(r.amount), 0);

  return (
    <>
      <section className="bg-brand-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-semibold text-accent-300">Transparansi</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Laporan Kas</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-100">
            Catatan pemasukan dan pengeluaran kas UKM PENRISTEK UT Bogor yang dipublikasikan secara terbuka.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total Pemasukan", value: masuk, tone: "text-emerald-700" },
            { label: "Total Pengeluaran", value: keluar, tone: "text-red-700" },
            { label: "Saldo", value: masuk - keluar, tone: "text-brand-900" },
          ].map((c) => (
            <div key={c.label} className="rounded-2xl border border-line bg-surface p-5 shadow-soft">
              <p className="text-sm text-muted">{c.label}</p>
              <p className={`mt-1 text-xl font-bold ${c.tone}`}>{rupiah.format(c.value)}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
          <div className="border-b border-line px-5 py-4 sm:px-6">
            <h2 className="font-semibold text-brand-900">Riwayat Transaksi</h2>
          </div>

          {error ? (
            <p role="alert" className="px-5 py-8 text-sm text-red-700 sm:px-6">
              Data kas belum dapat dimuat. Silakan coba lagi nanti.
            </p>
          ) : rows.length === 0 ? (
            <p className="px-5 py-8 text-sm text-muted sm:px-6">Belum ada transaksi yang dipublikasikan.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="bg-brand-50 text-brand-900">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold sm:px-6">Tanggal</th>
                    <th scope="col" className="px-3 py-3 font-semibold">Keterangan</th>
                    <th scope="col" className="px-3 py-3 font-semibold">Jenis</th>
                    <th scope="col" className="px-5 py-3 text-right font-semibold sm:px-6">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {rows.map((r) => {
                    const m = isIncome(r);
                    return (
                      <tr key={r.id} className="hover:bg-brand-50/50">
                        <td className="whitespace-nowrap px-5 py-3 sm:px-6">{tanggal.format(new Date(r.date))}</td>
                        <td className="px-3 py-3">{r.description ?? "—"}</td>
                        <td className="px-3 py-3">
                          <span
                            className={[
                              "rounded-full px-2.5 py-1 text-xs font-semibold",
                              m ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
                            ].join(" ")}
                          >
                            {m ? "Pemasukan" : "Pengeluaran"}
                          </span>
                        </td>
                        <td
                          className={`whitespace-nowrap px-5 py-3 text-right font-semibold sm:px-6 ${m ? "text-emerald-700" : "text-red-700"}`}
                        >
                          {m ? "+" : "−"} {rupiah.format(Number(r.amount))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
