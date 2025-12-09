"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogoutPage() {
  const router = useRouter();

  useEffect(() => {
    document.cookie = "admin-auth=; Max-Age=0; path=/; SameSite=Lax";
    router.replace("/admin/login");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0a0f16] text-slate-100">
      <p className="text-sm text-slate-300">Signing out…</p>
    </main>
  );
}
