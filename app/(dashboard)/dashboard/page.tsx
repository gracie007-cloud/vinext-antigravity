/*
 * File Name:     page.tsx
 * Description:   Dashboard home page — thin orchestrator that renders
 *                dashboard feature components (stats, activity, etc.).
 *                Replace with your own dashboard feature components.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

import Link from 'vinext/shims/link';

import { ROUTES } from '@/constants/routes';

/*
 * Component Name: DashboardPage
 * Description:    Placeholder dashboard page. Replace with your feature components.
 */
export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                    Welcome back. Here&apos;s an overview of your workspace.
                </p>
            </div>

            {/* Placeholder cards — replace with feature components */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                    { title: 'Total Users', value: '1,234', change: '+12%' },
                    { title: 'Revenue', value: '$45,678', change: '+8%' },
                    { title: 'Active Sessions', value: '321', change: '-3%' },
                ].map(({ title, value, change }) => (
                    <div
                        key={title}
                        className="flex flex-col gap-2 rounded-lg border border-border bg-card p-6"
                    >
                        <span className="text-sm text-muted-foreground">{title}</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-semibold text-foreground">
                                {value}
                            </span>
                            <span className="text-sm text-muted-foreground">{change}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick links */}
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6">
                <p className="text-sm font-semibold text-foreground">Quick Links</p>
                <div className="flex flex-wrap gap-2">
                    <Link
                        href={ROUTES.DASHBOARD.SETTINGS}
                        className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                        Settings
                    </Link>
                    <Link
                        href={ROUTES.DASHBOARD.PROFILE}
                        className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                        Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}
