/*
 * File Name:     ThemeProvider.tsx
 * Description:   Provides dark/light theme context using next-themes.
 * Author:        Antigravity
 * Created Date:  2024-02-26
 */

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/*
 * Component Name: ThemeProvider
 * Description:    Wrapper for next-themes Provider.
 * Props:
 *   - children (React.ReactNode)
 *   - props (ThemeProviderProps)
 */
export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
