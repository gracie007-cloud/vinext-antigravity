/*
 * File Name:     layout.tsx
 * Description:   Marketing route group layout. Wraps all public-facing
 *                pages with the MarketingShell header + footer.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

import { MarketingShell } from '@/components/layout/MarketingShell';

/*
 * Component Name: MarketingLayout
 * Description:    Public-facing layout — delegates rendering to MarketingShell.
 * Props:
 *   - children (React.ReactNode) — Marketing page content.
 */
export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MarketingShell>{children}</MarketingShell>;
}
