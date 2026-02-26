/*
 * File Name:     MarketingShell.tsx
 * Description:   Public marketing layout shell with a header and footer.
 *                Used by the (marketing) route group layout.
 *                Replace placeholder nav items with your own.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

import Link from 'vinext/shims/link';

import { ROUTES } from '@/constants/routes';

// ---------------------------------------------------------------------------
// Nav Config — replace with your own navigation items
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
    { label: 'About', href: ROUTES.MARKETING.ABOUT },
    { label: 'Pricing', href: ROUTES.MARKETING.PRICING },
    { label: 'Contact', href: ROUTES.MARKETING.CONTACT },
] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/*
 * Component Name: MarketingShell
 * Description:    Public-facing layout with a marketing header and footer.
 *                 Wraps all marketing route group pages.
 * Props:
 *   - children (React.ReactNode) — Page content rendered in the main area.
 */
export function MarketingShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            {/* Header */}
            <header className="border-b border-border">
                <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
                    <Link
                        href={ROUTES.HOME}
                        className="text-base font-semibold text-foreground"
                    >
                        vinext
                    </Link>

                    <nav className="flex items-center gap-6">
                        {NAV_ITEMS.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {label}
                            </Link>
                        ))}
                        <Link
                            href={ROUTES.AUTH.LOGIN}
                            className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            Sign In
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="border-t border-border">
                <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 text-sm text-muted-foreground sm:px-6">
                    <span>© {new Date().getFullYear()} vinext</span>
                    <div className="flex gap-4">
                        {NAV_ITEMS.map(({ label, href }) => (
                            <Link
                                key={href}
                                href={href}
                                className="transition-colors hover:text-foreground"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}
