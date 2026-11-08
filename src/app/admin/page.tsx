import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Dashboard Admin | PENRISTEK Hub" };

// Halaman bergantung pada sesi user, jadi tidak boleh di-cache statis.
export const dynamic = "force-dynamic";

// ASUMSI skema tabel `transactions` — sesuaikan jika nama kolom Anda berbeda.
type Transaction = {
  id: string | number;
  date: string;
  created_at: string;
  description: string | null;
  type: string; // "income" | "expense" (atau "pemasukan" | "pengeluaran")
  amount: number;
  receipt_url: string | null;
};

const INCOME_TYPES = ["income", "pemasukan", "masuk"];
const isIncome = (t: Transaction) => INCOME_TYPES.includes(t.type.toLowerCase());

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});
const tanggal = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" });

export default async function AdminPage() {
  const supabase = await createClient();

  // Lapisan kedua setelah proxy: pastikan user memang login.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })
    .returns<Transaction[]>();

  const transactions = data ?? [];
  const totalMasuk = transactions.filter(isIncome).reduce((s, t) => s + Number(t.amount), 0);
  const totalKeluar = transactions.filter((t) => !isIncome(t)).reduce((s, t) => s + Number(t.amount), 0);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Dashboard Admin</h1>
          <p className="mt-1 text-sm text-muted">Masuk sebagai {user.email}</p>
        </div>
        <Link
          href="/admin/tambah"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-900 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 motion-safe:transition-colors"
        >
          <Plus size={18} aria-hidden="true" />
          Tambah Transaksi
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-muted">Total Pemasukan</p>
          <p className="mt-1 text-xl font-bold text-emerald-700">{rupiah.format(totalMasuk)}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Total Pengeluaran</p>
          <p className="mt-1 text-xl font-bold text-red-700">{rupiah.format(totalKeluar)}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Saldo</p>
          <p className="mt-1 text-xl font-bold text-brand-950">{rupiah.format(totalMasuk - totalKeluar)}</p>
        </Card>
      </div>

      <Card className="mt-6 !p-0 overflow-hidden">
        <div className="border-b border-line px-5 py-4 sm:px-6">
          <h2 className="font-semibold text-brand-950">Riwayat Transaksi</h2>
        </div>

        {error ? (
          <p role="alert" className="px-5 py-8 text-sm text-red-700 sm:px-6">
            Gagal memuat transaksi. Coba muat ulang halaman.
          </p>
        ) : transactions.length === 0 ? (
          <p className="px-5 py-8 text-sm text-muted sm:px-6">Belum ada transaksi.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead className="bg-brand-50 text-brand-900">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold sm:px-6">Tanggal</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Keterangan</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Jenis</th>
                  <th scope="col" className="px-3 py-3 text-right font-semibold">Jumlah</th>
                  <th scope="col" className="px-5 py-3 font-semibold sm:px-6">Bukti</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {transactions.map((t) => {
                  const masuk = isIncome(t);
                  return (
                    <tr key={t.id}>
                      <td className="whitespace-nowrap px-5 py-3 sm:px-6">
                        {tanggal.format(new Date(t.date))}
                      </td>
                      <td className="px-3 py-3">{t.description ?? "—"}</td>
                      <td className="px-3 py-3">
                        <span
                          className={[
                            "rounded-full px-2.5 py-1 text-xs font-semibold",
                            masuk ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
                          ].join(" ")}
                        >
                          {masuk ? "Pemasukan" : "Pengeluaran"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-right font-medium">
                        {masuk ? "+" : "−"} {rupiah.format(Number(t.amount))}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 sm:px-6">
                        {t.receipt_url ? (
                          <a
                            href={t.receipt_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-brand-700 hover:underline"
                          >
                            Lihat Bukti
                          </a>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </main>
  );
}
