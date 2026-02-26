/*
 * File Name:     endpoints.ts
 * Description:   Central registry of all API endpoint paths. Every service
 *                imports paths from here — never hardcode URLs in services
 *                or components.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

// ---------------------------------------------------------------------------
// Base URL — sourced from environment
// ---------------------------------------------------------------------------

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

// ---------------------------------------------------------------------------
// Endpoint Registry
// ---------------------------------------------------------------------------
// Add new domain groups as your app grows.
// Static paths → string constants.
// Dynamic paths → functions returning strings.
//
// Example feature — replace or extend with your own domain endpoints.
// ---------------------------------------------------------------------------

export const API_ENDPOINTS = {
    // -- Auth ----------------------------------------------------------------
    AUTH: {
        LOGIN: `${BASE}/auth/login`,
        REGISTER: `${BASE}/auth/register`,
        LOGOUT: `${BASE}/auth/logout`,
        REFRESH_TOKEN: `${BASE}/auth/refresh-token`,
        FORGOT_PASSWORD: `${BASE}/auth/forgot-password`,
        RESET_PASSWORD: `${BASE}/auth/reset-password`,
    },

    // -- Users ---------------------------------------------------------------
    USERS: {
        LIST: `${BASE}/users`,
        DETAIL: (id: string): string => `${BASE}/users/${id}`,
        UPDATE: (id: string): string => `${BASE}/users/${id}`,
        DELETE: (id: string): string => `${BASE}/users/${id}`,
        PROFILE: `${BASE}/users/profile`,
    },
} as const;
