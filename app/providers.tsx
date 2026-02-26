/*
 * File Name:     providers.tsx
 * Description:   Root client-side providers wrapper.
 * Author:        Antigravity
 * Created Date:  2024-02-26
 */

"use client";

import * as React from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

/*
 * Component Name: Providers
 * Description:    Wraps the application with all necessary client-side providers.
 * Props:
 *   - children (React.ReactNode)
 */
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <TooltipProvider>
                {children}
                <Toaster richColors closeButton />
            </TooltipProvider>
        </ThemeProvider>
    );
}
