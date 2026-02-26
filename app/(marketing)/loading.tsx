/*
 * File Name:     loading.tsx
 * Description:   Marketing route group loading skeleton. Shows a header
 *                placeholder and content area while marketing pages
 *                stream in.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

/*
 * Component Name: MarketingLoading
 * Description:    Marketing-specific skeleton — hero and content placeholders.
 */
export default function MarketingLoading() {
    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-16 sm:px-6">
            {/* Hero placeholder */}
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="h-10 w-64 animate-pulse rounded-md bg-muted" />
                <div className="h-5 w-96 animate-pulse rounded-md bg-muted" />
            </div>

            {/* Content block placeholders */}
            <div className="flex flex-col gap-4">
                <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-4/6 animate-pulse rounded-md bg-muted" />
            </div>

            {/* Card grid placeholder */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-40 animate-pulse rounded-lg border border-border bg-muted"
                    />
                ))}
            </div>
        </div>
    );
}
