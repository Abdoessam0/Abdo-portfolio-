"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
      router.replace("/admin/login");
      router.refresh();
    };

    void logout();
  }, [router]);

  return (
    <main className="fixed inset-0 z-[120] flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
      <p className="text-sm text-slate-300">Signing out...</p>
    </main>
  );
}
