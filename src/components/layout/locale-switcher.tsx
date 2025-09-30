"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LocaleSwitcher() {
    const pathname = usePathname();
    const isTR = pathname?.startsWith("/tr");
    const target = isTR ? pathname.replace(/^\/tr/, "/en") : pathname?.startsWith("/en") ? pathname.replace(/^\/en/, "/tr") : `/tr${pathname === "/" ? "" : pathname}`;
    const label = isTR ? "EN" : "TR";
    return (
        <Link href={target} className="px-2 py-1 rounded-md bg-text/10 text-text/90 hover:bg-text/15">
            {label}
        </Link>
    );
}
