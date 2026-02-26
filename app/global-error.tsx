'use client';

/*
 * File Name:     global-error.tsx
 * Description:   Root layout error boundary. Catches errors specifically in the root layout.tsx file. Needs its own HTML/BODY tags.
 * Author:        Antigravity
 * Created Date:  2026-02-26
 */

import { AlertTriangle } from 'lucide-react';
import './globals.css';

// Using a basic fallback since complex UI might be broken if Layout fails
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body className="antialiased">
                <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background p-4 text-center">
                    <div className="flex max-w-md flex-col items-center space-y-6">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                            <AlertTriangle className="h-12 w-12" />
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-4xl font-semibold tracking-tight text-foreground">Critical Error</h1>
                            <p className="text-muted-foreground">
                                A critical system error occurred while attempting to render the root layout.
                            </p>
                        </div>

                        <button
                            onClick={() => reset()}
                            className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
