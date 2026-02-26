import Link from 'vinext/shims/link';
import { ShieldAlert, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

/*
 * File Name:     forbidden.tsx
 * Description:   Global 403 Forbidden page. Renders when forbidden() is called indicating lack of permissions.
 * Author:        Antigravity
 * Created Date:  2026-02-26
 */

export default function Forbidden() {
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background p-4 text-center">
            <div className="flex max-w-md flex-col items-center space-y-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <ShieldAlert className="h-12 w-12" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-semibold tracking-tight text-foreground">403 - Forbidden</h1>
                    <p className="text-muted-foreground">
                        You don't have permission to access this resource. Please contact your administrator if you believe this is a mistake.
                    </p>
                </div>

                <Button asChild className="mt-8">
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Return to Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}
