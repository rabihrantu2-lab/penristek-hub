"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  BULAN_KAS,
  DB_TYPE,
  JENIS,
  KATEGORI,
  RECEIPT_BUCKET,
  RECEIPT_MAX_BYTES,
  RECEIPT_TYPES,
} from "@/lib/kas";
import { createClient } from "@/lib/supabase/server";

export type FormState = {
  errors?: Partial<Record<string, string[]>>;
  message?: string;
};

const schema = z
  .object({
    jenis: z.enum(JENIS, { error: "Pilih jenis transaksi." }),
    kategori: z.enum(KATEGORI, { error: "Pilih kategori." }),
    nama: z.string().trim().max(100, "Nama maksimal 100 karakter."),
    bulan: z.array(z.enum(BULAN_KAS.map((b) => b.value) as [string, ...string[]])),
    nominal: z.coerce
      .number({ error: "Nominal harus berupa angka." })
      .int("Nominal harus bilangan bulat.")
      .positive("Nominal harus lebih dari 0.")
      .max(1_000_000_000, "Nominal terlalu besar."),
    tanggal: z.iso.date({ error: "Tanggal tidak valid." }),
    deskripsi: z.string().trim().max(300, "Deskripsi maksimal 300 karakter."),
  })
  .superRefine((v, ctx) => {
    const add = (path: string, message: string) =>
      ctx.addIssue({ code: "custom", path: [path], message });

    // Pengeluaran selalu diperlakukan sebagai "lainnya" (deskripsi manual).
    const kategori = v.jenis === "pengeluaran" ? "lainnya" : v.kategori;

    if (v.jenis === "pemasukan" && !v.nama) add("nama", "Nama anggota/donatur wajib diisi.");
    if (kategori === "kas" && v.bulan.length === 0) add("bulan", "Pilih minimal satu bulan.");
    if (kategori !== "kas" && !v.deskripsi) add("deskripsi", "Deskripsi wajib diisi.");
  });

// Cek "magic bytes" agar tidak hanya percaya pada MIME type dari browser.
function hasImageSignature(b: Uint8Array, ext: "jpg" | "png"): boolean {
  if (ext === "png") {
    return [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((x, i) => b[i] === x);
  }
  return b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
}

function buildDescription(v: z.infer<typeof schema>): string {
  if (v.jenis === "pengeluaran") return v.deskripsi;

  if (v.kategori === "kas") {
    const bulan = BULAN_KAS.filter((b) => v.bulan.includes(b.value))
      .map((b) => b.short)
      .join(" & ");
    return `Kas ${bulan} - ${v.nama}`;
  }
  if (v.kategori === "donasi") {
    return v.deskripsi ? `Donasi - ${v.nama} (${v.deskripsi})` : `Donasi - ${v.nama}`;
  }
  // Pemasukan "lainnya": deskripsi manual + nama pihak (wajib dicatat).
  return `${v.deskripsi} - ${v.nama}`;
}

export async function tambahTransaksi(_prev: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const parsed = schema.safeParse({
    jenis: formData.get("jenis"),
    kategori: formData.get("kategori"),
    nama: formData.get("nama") ?? "",
    bulan: formData.getAll("bulan"),
    nominal: formData.get("nominal"),
    tanggal: formData.get("tanggal"),
    deskripsi: formData.get("deskripsi") ?? "",
  });

  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors };
  }

  const v = parsed.data;

  // Bukti transfer (opsional): validasi, lalu upload ke Storage.
  let receiptUrl: string | null = null;
  let receiptPath: string | null = null;
  const file = formData.get("receipt");

  if (file instanceof File && file.size > 0) {
    const ext = RECEIPT_TYPES[file.type as keyof typeof RECEIPT_TYPES];
    if (!ext) return { errors: { receipt: ["Format harus JPG atau PNG."] } };
    if (file.size > RECEIPT_MAX_BYTES) {
      return { errors: { receipt: ["Ukuran file maksimal 2MB."] } };
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!hasImageSignature(bytes, ext)) {
      return { errors: { receipt: ["File bukan gambar JPG/PNG yang valid."] } };
    }

    // Nama unik & tak bisa ditebak: tanggal-uuid.ext (bukti bisa memuat data rekening).
    receiptPath = `${v.tanggal}-${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from(RECEIPT_BUCKET)
      .upload(receiptPath, bytes, { contentType: file.type, upsert: false });

    if (uploadError) {
      return { message: "Gagal mengunggah bukti transfer. Coba lagi." };
    }
    receiptUrl = supabase.storage.from(RECEIPT_BUCKET).getPublicUrl(receiptPath).data.publicUrl;
  }

  const { error } = await supabase.from("transactions").insert({
    type: DB_TYPE[v.jenis],
    amount: v.nominal,
    description: buildDescription(v),
    date: v.tanggal,
    status: "posted",
    receipt_url: receiptUrl,
  });

  if (error) {
    // Jangan tinggalkan file yatim jika insert gagal.
    if (receiptPath) await supabase.storage.from(RECEIPT_BUCKET).remove([receiptPath]);
    // RLS menolak jika bukan admin; detail tidak diekspos ke user.
    return { message: "Gagal menyimpan transaksi. Pastikan akun Anda memiliki akses admin." };
  }

  revalidatePath("/admin");
  redirect("/admin");
}
