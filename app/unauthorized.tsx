/*
 * File Name:     unauthorized.tsx
 * Description:   Global 401 Unauthorized page. Renders when unauthorized() is called indicating unauthenticated access.
 * Author:        Antigravity
 * Created Date:  2026-02-26
 */

import Link from 'vinext/shims/link';
import { Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Unauthorized() {
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background p-4 text-center">
            <div className="flex max-w-md flex-col items-center space-y-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Lock className="h-12 w-12" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-semibold tracking-tight text-foreground">401 - Unauthorized</h1>
                    <p className="text-muted-foreground">
                        Please log in to access this page. Your session may have expired.
                    </p>
                </div>

                <div className="mt-8 flex gap-4">
                    <Button asChild>
                        <Link href="/login">
                            <LogIn className="mr-2 h-4 w-4" />
                            Log In
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/">Return to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
