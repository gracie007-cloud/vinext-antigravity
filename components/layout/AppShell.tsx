/*
 * File Name:     AppShell.tsx
 * Description:   Authenticated layout shell with a sidebar and top header.
 *                Used by the (dashboard) route group layout.
 *                Replace placeholder nav items with your own.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

import Link from 'vinext/shims/link';
import {
    LayoutDashboard,
    Settings,
    User,
    LogOut,
    PanelLeft,
} from 'lucide-react';

import { ROUTES } from '@/constants/routes';

// ---------------------------------------------------------------------------
// Nav Config — replace with your own navigation items
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
    { icon: LayoutDashboard, label: 'Dashboard', href: ROUTES.DASHBOARD.ROOT },
    { icon: User, label: 'Profile', href: ROUTES.DASHBOARD.PROFILE },
    { icon: Settings, label: 'Settings', href: ROUTES.DASHBOARD.SETTINGS },
] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/*
 * Component Name: AppShell
 * Description:    Authenticated shell with a collapsible sidebar and top header.
 *                 Wraps all dashboard route group pages.
 * Props:
 *   - children (React.ReactNode) — Page content rendered in the main area.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="hidden w-64 shrink-0 border-r border-border bg-card md:flex md:flex-col">
                {/* Sidebar Header */}
                <div className="flex h-16 items-center gap-2 border-b border-border px-6">
                    <PanelLeft className="h-5 w-5 text-primary" />
                    <span className="text-base font-semibold text-foreground">
                        vinext
                    </span>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-1 flex-col gap-1 p-4">
                    {NAV_ITEMS.map(({ icon: Icon, label, href }) => (
                        <Link
                            key={href}
                            href={href}
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="border-t border-border p-4">
                    <Link
                        href={ROUTES.AUTH.LOGIN}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Link>
                </div>
            </aside>

            {/* Main content area */}
            <div className="flex flex-1 flex-col">
                {/* Top header (mobile) */}
                <header className="flex h-16 items-center border-b border-border px-6 md:hidden">
                    <PanelLeft className="h-5 w-5 text-primary" />
                    <span className="ml-2 text-base font-semibold text-foreground">
                        vinext
                    </span>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 md:p-8">{children}</main>
            </div>
        </div>
    );
}
