/*
 * File Name:     page.tsx
 * Description:   Dashboard settings page — thin orchestrator that renders
 *                settings feature components.
 *                Replace with your own settings feature components.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

import Link from 'vinext/shims/link';

import { ROUTES } from '@/constants/routes';

/*
 * Component Name: SettingsPage
 * Description:    Placeholder settings page. Replace with your feature components.
 */
export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <Link
                    href={ROUTES.DASHBOARD.ROOT}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    ← Dashboard
                </Link>
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your account preferences and configuration.
                </p>
            </div>

            {/* Placeholder — replace with feature components */}
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">
                    🔧 Replace this placeholder with your settings feature components from{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
                        @/features/settings
                    </code>
                    .
                </p>
            </div>
        </div>
    );
}
