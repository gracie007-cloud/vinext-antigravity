/*
 * File Name:     loading.tsx
 * Description:   Auth route group loading skeleton. Shows a centered
 *                card placeholder while auth pages stream in.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

/*
 * Component Name: AuthLoading
 * Description:    Auth-specific skeleton — centered card placeholder.
 */
export default function AuthLoading() {
    return (
        <div className="flex flex-col gap-6">
            {/* Title placeholder */}
            <div className="flex flex-col gap-2">
                <div className="h-8 w-32 animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-48 animate-pulse rounded-md bg-muted" />
            </div>

            {/* Input placeholders */}
            <div className="flex flex-col gap-4">
                <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
                <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
            </div>

            {/* Button placeholder */}
            <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
        </div>
    );
}
