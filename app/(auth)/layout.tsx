/*
 * File Name:     layout.tsx
 * Description:   Auth route group layout. Provides a minimal centered
 *                card wrapper for login, register, and password flows.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

/*
 * Component Name: AuthLayout
 * Description:    Minimal centered layout for auth pages — no header/footer.
 * Props:
 *   - children (React.ReactNode) — Auth page content.
 */
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
            <div className="w-full max-w-md">{children}</div>
        </div>
    );
}
