/*
 * File Name:     page.tsx
 * Description:   Login page — thin orchestrator that renders the auth
 *                login form from the auth feature.
 *                Replace with your own LoginForm component.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

import Link from 'vinext/shims/link';

import { ROUTES } from '@/constants/routes';

/*
 * Component Name: LoginPage
 * Description:    Placeholder login page. Replace with your feature component.
 */
export default function LoginPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-foreground">Sign In</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your credentials to access your account.
                </p>
            </div>

            {/* Placeholder — replace with: <LoginForm /> from @/features/auth */}
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">
                    🔧 Replace this placeholder with your{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
                        LoginForm
                    </code>{' '}
                    component from{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
                        @/features/auth
                    </code>
                    .
                </p>
            </div>

            <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                    href={ROUTES.AUTH.REGISTER}
                    className="font-semibold text-primary hover:underline"
                >
                    Sign Up
                </Link>
            </p>
        </div>
    );
}
