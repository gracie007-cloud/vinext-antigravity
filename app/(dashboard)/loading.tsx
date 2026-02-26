/*
 * File Name:     loading.tsx
 * Description:   Dashboard route group loading skeleton. Shows a sidebar
 *                placeholder and content area pulses while dashboard
 *                pages stream in.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

/*
 * Component Name: DashboardLoading
 * Description:    Dashboard-specific skeleton — content area with pulsing cards.
 */
export default function DashboardLoading() {
    return (
        <div className="flex flex-col gap-6">
            {/* Page header placeholder */}
            <div className="flex flex-col gap-2">
                <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-64 animate-pulse rounded-md bg-muted" />
            </div>

            {/* Card grid placeholder */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-32 animate-pulse rounded-lg border border-border bg-muted"
                    />
                ))}
            </div>
        </div>
    );
}
