/*
 * File Name:     routes.ts
 * Description:   Centralized route path registry. All Link href and
 *                router.push() calls should import from here — never
 *                hardcode route strings in components or pages.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

// ---------------------------------------------------------------------------
// Route Registry
// ---------------------------------------------------------------------------
// Add new domain groups as your app grows.
// Static paths → string constants.
// Dynamic paths → functions returning strings.
//
// Example routes — replace or extend with your own.
// ---------------------------------------------------------------------------

export const ROUTES = {
    // -- Public ---------------------------------------------------------------
    HOME: '/',

    // -- Auth (route group: (auth)) -------------------------------------------
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        FORGOT_PASSWORD: '/forgot-password',
    },

    // -- Dashboard (route group: (dashboard)) ---------------------------------
    DASHBOARD: {
        ROOT: '/dashboard',
        SETTINGS: '/dashboard/settings',
        PROFILE: '/dashboard/profile',
    },

    // -- Marketing (route group: (marketing)) ---------------------------------
    MARKETING: {
        ABOUT: '/about',
        PRICING: '/pricing',
        CONTACT: '/contact',
    },
} as const;

// ---------------------------------------------------------------------------
// Type Helpers
// ---------------------------------------------------------------------------

/*
 * Function Name: flattenRoutes
 * Description:   Recursively extracts all route string values from
 *                the ROUTES object for type-safe route validation.
 * Parameters:    obj (Record<string, unknown>) — nested route object.
 * Returns:       string[] — flat array of all route paths.
 */
type RouteValue<T> = T extends string
    ? T
    : T extends Record<string, unknown>
    ? RouteValue<T[keyof T]>
    : never;

export type AppRoute = RouteValue<typeof ROUTES>;
