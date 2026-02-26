'use client';

/*
 * File Name:     error.tsx
 * Description:   Global error boundary. Catches unexpected runtime errors and lazy loading failures.
 * Author:        Antigravity
 * Created Date:  2026-02-26
 */

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Runtime Error Caught:', error);
    }, [error]);

    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background p-4 text-center">
            <div className="flex max-w-md flex-col items-center space-y-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <AlertTriangle className="h-12 w-12" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-semibold tracking-tight text-foreground">Something went wrong!</h1>
                    <p className="text-muted-foreground">
                        An unexpected error occurred. We've been notified and are looking into it.
                    </p>
                </div>

                <Button onClick={() => reset()} className="mt-8">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Try Again
                </Button>
            </div>
        </div>
    );
}
