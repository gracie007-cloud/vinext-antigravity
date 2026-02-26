/*
 * File Name:     loading.tsx
 * Description:   Root-level loading fallback. Shown as a Suspense boundary
 *                while the page component streams in.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

/*
 * Component Name: RootLoading
 * Description:    Simple centered spinner — the default lazy-loading state.
 */
export default function RootLoading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
                <span className="text-sm text-muted-foreground">Loading…</span>
            </div>
        </div>
    );
}
