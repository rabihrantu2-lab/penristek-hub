"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError("Email atau password salah.");
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  const inputClass =
    "mt-1.5 block min-h-12 w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-brand-950 placeholder:text-brand-700/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700";

  return (
    <main className="flex min-h-svh items-center justify-center bg-brand-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-brand-950">Masuk Admin</h1>
          <p className="mt-2 text-sm text-brand-700">
            Khusus pengurus PENRISTEK untuk mengelola data kas.
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-brand-950">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-semibold text-brand-950">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" loading={loading} className="w-full">
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
