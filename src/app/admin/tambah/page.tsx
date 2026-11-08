import type { Metadata } from "next";
import { TambahForm } from "./TambahForm";

export const metadata: Metadata = { title: "Tambah Transaksi | PENRISTEK Hub" };
export const dynamic = "force-dynamic";

export default function TambahPage() {
  // Tanggal hari ini (WIB) dihitung di server agar tidak beda dengan hasil render client.
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date());
  return <TambahForm today={today} />;
}
