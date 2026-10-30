import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";

type PagePlaceholderProps = {
  title: string;
  description: string;
};

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/" className="mb-8 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-brand-900 hover:text-brand-700">
        <ArrowLeft size={17} aria-hidden="true" /> Kembali ke beranda
      </Link>
      <Card className="max-w-3xl">
        <p className="text-sm font-semibold text-brand-700">PENRISTEK UT Bogor</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">{description}</p>
      </Card>
    </section>
  );
}
