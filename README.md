# PENRISTEK Hub

Fondasi Next.js App Router + TypeScript + Tailwind CSS v4 untuk UKM PENRISTEK UT Bogor, Kabinet Ganesha Aksara.

## Menjalankan

Gunakan Node.js minimal 20.9.0 dan npm. Dalam folder yang berisi package.json:

```bash
npm ci
npm run dev
```

Buka http://localhost:3000. Build mengambil font Inter dan Plus Jakarta Sans melalui next/font/google, sehingga memerlukan akses jaringan pada saat build.

## Pemeriksaan

```bash
npm run lint
npm run typecheck
npm run build
```

Menjalankan hasil build produksi:

```bash
npm run start
```

## Struktur utama

- `src/app/layout.tsx`: font, metadata, dan CSS global.
- `src/app/(public)/layout.tsx`: Navbar, satu main, Footer, dan skip link.
- `src/app/(public)/page.tsx`: beranda; bagian profil menggunakan id `profil`.
- `src/app/(public)/program/page.tsx`: halaman program.
- `src/app/(public)/pengurus/page.tsx`: halaman pengurus.
- `src/app/(public)/transparansi/page.tsx`: halaman transparansi kas.
- `src/components/layout/`: Navbar dan Footer dengan named exports.
- `src/components/ui/`: Button, Card, dan tampilan halaman yang belum berisi data.
- `public/brand/`: kedua logo dari aset pemilik.
- `tailwind.config.ts`: token desain; dipanggil melalui @config pada globals.css.

Alias `@/` mengarah ke `src/`. Contoh import yang benar:

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
```

## Catatan perbaikan dari commit d36c73a

1. Menambahkan Navbar/Footer yang sebelumnya diimpor tetapi belum ada, serta menggunakan named imports sesuai exports.
2. Memperbaiki alias TypeScript dari `./*` menjadi `./src/*`.
3. Memindahkan beranda ke route group publik dan memasang Navbar/Footer sekali melalui layout.
4. Menambahkan logo PENRISTEK dan UT pada lokasi yang dirujuk next/image.
5. Menyesuaikan ikon Instagram: lucide-react 1.65.0 tidak menyediakan export Instagram. Ikon sosial memakai SVG lokal; ikon UI lain tetap memakai Lucide.
6. Menggunakan satu pipeline Tailwind v4 melalui PostCSS; menghapus loader Turbopack tambahan dan opsi eksperimental yang belum diperlukan fondasi ini.
7. Memperbaiki warning konfigurasi PostCSS dan tipe modul package.
8. Menambahkan halaman tujuan navigasi dan halaman 404. Halaman program/pengurus/transparansi masih menampilkan keterangan bahwa informasi belum dipublikasikan.

**Penting saat menyalin ke proyek lama:** hapus `src/app/page.tsx` lama setelah beranda tersedia pada `src/app/(public)/page.tsx`. Kedua lokasi menghasilkan URL `/`; menyimpan keduanya akan menimbulkan konflik route. Gunakan patch yang disediakan jika ingin memindahkan/menghapus berkas secara otomatis pada checkout yang sesuai.

## Batas tahap ini

Ini fondasi halaman publik. Integrasi Supabase, login admin, database kas, grafik, dan CRUD belum ditambahkan pada tahap ini. Halaman transparansi tidak menampilkan saldo contoh atau menganggap belum ada data sebagai saldo Rp0.

## Deployment Vercel

Pilih framework Next.js, install command `npm ci`, build command `npm run build`, dan biarkan output directory mengikuti default Next.js. Belum diperlukan variabel Supabase untuk tahap fondasi ini.
