"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = {
    children: React.ReactNode;
    attribute?: "class" | "data-theme";
    defaultTheme?: "light" | "dark" | "system";
    enableSystem?: boolean;
};

export function ThemeProvider({
    children,
    attribute = "class",
    defaultTheme = "dark",
    enableSystem = true,
}: ThemeProviderProps) {
    return (
        <NextThemesProvider attribute={attribute} defaultTheme={defaultTheme} enableSystem={enableSystem}>
            {children}
        </NextThemesProvider>
    );
}


