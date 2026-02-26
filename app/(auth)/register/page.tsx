/*
 * File Name:     page.tsx
 * Description:   Register page — thin orchestrator that renders the
 *                registration form from the auth feature.
 *                Replace with your own RegisterForm component.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

import Link from 'vinext/shims/link';

import { ROUTES } from '@/constants/routes';

/*
 * Component Name: RegisterPage
 * Description:    Placeholder register page. Replace with your feature component.
 */
export default function RegisterPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-foreground">
                    Create Account
                </h1>
                <p className="text-sm text-muted-foreground">
                    Fill in your details to get started.
                </p>
            </div>

            {/* Placeholder — replace with: <RegisterForm /> from @/features/auth */}
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">
                    🔧 Replace this placeholder with your{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
                        RegisterForm
                    </code>{' '}
                    component from{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
                        @/features/auth
                    </code>
                    .
                </p>
            </div>

            <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                    href={ROUTES.AUTH.LOGIN}
                    className="font-semibold text-primary hover:underline"
                >
                    Sign In
                </Link>
            </p>
        </div>
    );
}
