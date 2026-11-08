// Aturan bisnis kas, dipakai bersama oleh form (client) dan Server Action.
export const KAS_PER_BULAN = 10_000;

// Tagihan dimulai Oktober; saat ini November. Tambahkan bulan baru di sini.
export const BULAN_KAS = [
  { value: "okt", label: "Oktober", short: "Okt" },
  { value: "nov", label: "November", short: "Nov" },
] as const;

export type BulanKas = (typeof BULAN_KAS)[number]["value"];

export const JENIS = ["pemasukan", "pengeluaran"] as const;
export const KATEGORI = ["kas", "donasi", "lainnya"] as const;

export const RECEIPT_BUCKET = "receipts";
export const RECEIPT_MAX_BYTES = 2 * 1024 * 1024;
export const RECEIPT_TYPES = { "image/jpeg": "jpg", "image/png": "png" } as const;

export const REKENING = {
  bank: "SeaBank",
  nama: "La Mushisyari Rabih Rantu",
  nomor: "901110105397",
} as const;

// Nilai kolom `transactions.type` di database.
export const DB_TYPE = { pemasukan: "income", pengeluaran: "expense" } as const;
