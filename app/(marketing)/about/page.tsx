/*
 * File Name:     page.tsx
 * Description:   About page — thin orchestrator for the marketing about section.
 *                Replace with your own content.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

/*
 * Component Name: AboutPage
 * Description:    Placeholder about page. Replace with your content.
 */
export default function AboutPage() {
    return (
        <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-16 sm:px-6">
            <div className="flex flex-col gap-3 text-center">
                <h1 className="text-3xl font-semibold text-foreground">About</h1>
                <p className="text-lg text-muted-foreground">
                    Learn more about what we do and why we do it.
                </p>
            </div>

            {/* Placeholder — replace with your about content */}
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">
                    🔧 Replace this placeholder with your about page content. This page
                    lives in the{' '}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">
                        (marketing)
                    </code>{' '}
                    route group and inherits the marketing header + footer layout.
                </p>
            </div>
        </div>
    );
}
