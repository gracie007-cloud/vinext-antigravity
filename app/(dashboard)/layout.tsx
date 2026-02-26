/*
 * File Name:     layout.tsx
 * Description:   Dashboard route group layout. Wraps all authenticated
 *                pages with the AppShell sidebar + header.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

import { AppShell } from '@/components/layout/AppShell';

/*
 * Component Name: DashboardLayout
 * Description:    Authenticated layout — delegates rendering to AppShell.
 * Props:
 *   - children (React.ReactNode) — Dashboard page content.
 */
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AppShell>{children}</AppShell>;
}
