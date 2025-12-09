"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const auth = localStorage.getItem("admin_authenticated");
            const username = localStorage.getItem("admin_username");

            if (auth === "true" && username === "abdo") {
                setIsAuthenticated(true);
            } else {
                router.push("/admin/login");
            }

            setLoading(false);
        };

        checkAuth();

        // Check auth on window focus
        const handleFocus = () => checkAuth();
        window.addEventListener("focus", handleFocus);

        return () => window.removeEventListener("focus", handleFocus);
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                    <p className="mt-4 text-slate-400">Verifying authentication...</p>
                </div>
            </div>
        );
    }

    return isAuthenticated ? <>{children}</> : null;
}