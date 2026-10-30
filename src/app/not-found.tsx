import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col items-start justify-center px-6 py-16">
      <p className="font-semibold text-brand-700">404</p>
      <h1 className="mt-3 text-3xl font-bold text-brand-900">Halaman tidak ditemukan</h1>
      <p className="mt-4 leading-7 text-muted">Alamat yang Anda buka tidak tersedia. Silakan kembali ke beranda PENRISTEK Hub.</p>
      <Link href="/" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-brand-900 px-5 font-semibold text-white hover:bg-brand-700">Kembali ke beranda</Link>
    </main>
  );
}
