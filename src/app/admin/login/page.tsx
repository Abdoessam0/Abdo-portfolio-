"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_PASSWORD = "1234";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    if (password === ADMIN_PASSWORD) {
      // Store simple auth flag (non-HttpOnly by requirement).
      document.cookie = `admin-auth=true; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
      router.push("/admin");
    } else {
      alert("Wrong password");
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0f16] px-4 text-slate-100">
      <div className="w-full max-w-md rounded-2xl border border-emerald-500/20 bg-white/5 p-8 shadow-lg shadow-emerald-500/10">
        <div className="mb-6 space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">Admin Access</p>
          <h1 className="text-2xl font-semibold">Enter password</h1>
          <p className="text-sm text-slate-400">Private area. No username needed.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-slate-200">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-emerald-500/30 bg-[#0f1724] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
              placeholder="Enter admin password"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-[#061016] transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
