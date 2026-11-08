import Image from "next/image";

// Tiga logo dalam satu pill putih. Logo PENRISTEK sengaja dibuat paling besar.
const sizes = {
  nav: {
    pill: "gap-2 px-2 py-1.5 sm:gap-3 sm:px-3",
    penristek: "size-10 sm:size-12",
    ormawa: "h-8 sm:h-10",
    ut: "h-6 sm:h-8",
    divider: "h-7 sm:h-9",
  },
  footer: {
    pill: "gap-3 px-3 py-2 sm:gap-4 sm:px-4",
    penristek: "size-14 sm:size-16",
    ormawa: "h-11 sm:h-14",
    ut: "h-9 sm:h-11",
    divider: "h-10 sm:h-12",
  },
} as const;

export function BrandLogos({ size, decorative = false }: { size: keyof typeof sizes; decorative?: boolean }) {
  const s = sizes[size];
  const alt = (text: string) => (decorative ? "" : text);
  const divider = <span aria-hidden="true" className={`w-px bg-brand-900/15 ${s.divider}`} />;

  return (
    <span
      className={`flex w-fit shrink-0 items-center rounded-xl bg-white ${s.pill}`}
      aria-hidden={decorative || undefined}
    >
      <Image src="/brand/logo-penristek.png" alt={alt("Logo UKM PENRISTEK UT Bogor")} width={640} height={640} className={`${s.penristek} object-contain`} />
      {divider}
      <Image src="/brand/logo-ormawa.png" alt={alt("Logo ORMAWA Universitas Terbuka Bogor")} width={1080} height={1350} className={`${s.ormawa} w-auto object-contain`} />
      {divider}
      <Image src="/brand/logo-ut.png" alt={alt("Logo Universitas Terbuka")} width={295} height={222} className={`${s.ut} w-auto object-contain`} />
    </span>
  );
}
