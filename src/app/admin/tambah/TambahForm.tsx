"use client";

import { useActionState, useState, type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BULAN_KAS, KAS_PER_BULAN, REKENING, type BulanKas } from "@/lib/kas";
import { tambahTransaksi, type FormState } from "../actions";

const inputClass =
  "mt-1.5 block min-h-12 w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-brand-950 placeholder:text-brand-700/50";

function Field({
  id,
  label,
  errors,
  children,
}: {
  id: string;
  label: string;
  errors?: string[];
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-brand-950">
        {label}
      </label>
      {children}
      {errors?.map((e) => (
        <p key={e} role="alert" className="mt-1.5 text-sm text-red-700">
          {e}
        </p>
      ))}
    </div>
  );
}

export function TambahForm({ today }: { today: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(tambahTransaksi, {});
  const errors = state.errors ?? {};

  const [jenis, setJenis] = useState<"pemasukan" | "pengeluaran">("pemasukan");
  const [kategori, setKategori] = useState<"kas" | "donasi" | "lainnya">("kas");
  const [bulan, setBulan] = useState<BulanKas[]>([]);
  const [nominal, setNominal] = useState("");
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState(today);
  const [deskripsi, setDeskripsi] = useState("");

  // Pengeluaran selalu memakai deskripsi manual, jadi kategori dianggap "lainnya".
  const efektif = jenis === "pengeluaran" ? "lainnya" : kategori;
  const isKas = efektif === "kas";

  function toggleBulan(value: BulanKas, checked: boolean) {
    const next = checked ? [...bulan, value] : bulan.filter((b) => b !== value);
    setBulan(next);
    // Isi otomatis; user tetap bisa mengubah angkanya setelahnya.
    setNominal(next.length ? String(next.length * KAS_PER_BULAN) : "");
  }

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6">
      <Link href="/admin" className="text-sm font-semibold text-brand-700 hover:underline">
        ← Kembali ke dashboard
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-brand-950">Tambah Transaksi</h1>

      <Card className="mt-6 border-accent-400 bg-accent-50/40">
        <p className="text-sm font-semibold text-brand-950">Rekening Tujuan Transfer</p>
        <dl className="mt-2 space-y-1 text-sm">
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-muted">Bank</dt>
            <dd className="font-medium">{REKENING.bank}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-muted">Atas Nama</dt>
            <dd className="font-medium">{REKENING.nama}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 shrink-0 text-muted">No. Rekening</dt>
            <dd className="font-mono font-medium">{REKENING.nomor}</dd>
          </div>
        </dl>
      </Card>

      <Card className="mt-4">
        <form action={action} className="space-y-5" noValidate>
          <Field id="jenis" label="Jenis" errors={errors.jenis}>
            <select
              id="jenis"
              name="jenis"
              value={jenis}
              onChange={(e) => setJenis(e.target.value as typeof jenis)}
              className={inputClass}
            >
              <option value="pemasukan">Pemasukan</option>
              <option value="pengeluaran">Pengeluaran</option>
            </select>
          </Field>

          {jenis === "pemasukan" ? (
            <Field id="kategori" label="Kategori" errors={errors.kategori}>
              <select
                id="kategori"
                name="kategori"
                value={kategori}
                onChange={(e) => setKategori(e.target.value as typeof kategori)}
                className={inputClass}
              >
                <option value="kas">Kas Bulanan</option>
                <option value="donasi">Donasi</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </Field>
          ) : (
            <input type="hidden" name="kategori" value="lainnya" />
          )}

          {jenis === "pemasukan" && (
            <Field
              id="nama"
              label={kategori === "donasi" ? "Nama Donatur" : "Nama Anggota"}
              errors={errors.nama}
            >
              <input
                id="nama"
                name="nama"
                type="text"
                autoComplete="off"
                maxLength={100}
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className={inputClass}
              />
            </Field>
          )}

          {isKas && (
            <fieldset>
              <legend className="text-sm font-semibold text-brand-950">Bulan Kas</legend>
              <div className="mt-2 flex flex-wrap gap-3">
                {BULAN_KAS.map((b) => (
                  <label
                    key={b.value}
                    className="flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      name="bulan"
                      value={b.value}
                      checked={bulan.includes(b.value)}
                      onChange={(e) => toggleBulan(b.value, e.target.checked)}
                      className="size-4"
                    />
                    {b.label}
                  </label>
                ))}
              </div>
              {errors.bulan?.map((e) => (
                <p key={e} role="alert" className="mt-1.5 text-sm text-red-700">
                  {e}
                </p>
              ))}
            </fieldset>
          )}

          <Field id="nominal" label="Nominal (Rp)" errors={errors.nominal}>
            <input
              id="nominal"
              name="nominal"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field id="tanggal" label="Tanggal" errors={errors.tanggal}>
            <input
              id="tanggal"
              name="tanggal"
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className={inputClass}
            />
          </Field>

          {!isKas && (
            <Field id="deskripsi" label="Deskripsi" errors={errors.deskripsi}>
              <textarea
                id="deskripsi"
                name="deskripsi"
                rows={3}
                maxLength={300}
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                className={inputClass}
              />
            </Field>
          )}

          <Field id="receipt" label="Upload Bukti Transfer (Opsional)" errors={errors.receipt}>
            <input
              id="receipt"
              name="receipt"
              type="file"
              accept="image/jpeg,image/png"
              className={`${inputClass} file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand-900`}
            />
            <p className="mt-1.5 text-xs text-muted">JPG atau PNG, maksimal 2MB.</p>
          </Field>

          {state.message && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.message}
            </p>
          )}

          <Button type="submit" size="lg" loading={pending} className="w-full">
            {pending ? "Menyimpan..." : "Simpan Transaksi"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
