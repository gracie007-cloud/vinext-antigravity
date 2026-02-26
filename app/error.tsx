/*
 * File Name:     error.tsx
 * Description:   Global error boundary that catches unhandled runtime errors
 *                and displays a user-friendly recovery UI.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

/*
 * Component Name: GlobalError
 * Description:    Renders a styled error state with a retry action.
 * Props:
 *   - error (Error & { digest?: string }) — The caught error object.
 *   - reset (() => void) — Callback to re-render the route segment.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        // eslint-disable-next-line no-console
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
            <div className="flex flex-col items-center gap-2">
                <span className="text-5xl">⚠️</span>
                <h1 className="text-2xl font-semibold text-foreground">
                    Something went wrong
                </h1>
                <p className="max-w-md text-base text-muted-foreground">
                    An unexpected error occurred. Please try again, or contact support if
                    the problem persists.
                </p>
            </div>
            <Button onClick={() => reset()} variant="default" size="lg">
                Try Again
            </Button>
        </div>
    );
}
