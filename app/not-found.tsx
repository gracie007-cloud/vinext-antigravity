/*
 * File Name:     not-found.tsx
 * Description:   Custom 404 page displayed when a requested route does
 *                not exist.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

import Link from "vinext/shims/link";

/*
 * Component Name: NotFound
 * Description:    Renders a user-friendly 404 state with navigation
 *                 back to the homepage.
 */
export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
            <div className="flex flex-col items-center gap-2">
                <span className="text-7xl font-semibold text-primary">404</span>
                <h1 className="text-2xl font-semibold text-foreground">
                    Page Not Found
                </h1>
                <p className="max-w-md text-base text-muted-foreground">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
            </div>
            <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
                Go Home
            </Link>
        </div>
    );
}
