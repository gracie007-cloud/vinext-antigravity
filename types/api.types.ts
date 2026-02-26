/*
 * File Name:     api.types.ts
 * Description:   Shared type contracts for all API calls — response wrappers,
 *                error shape, pagination, and request configuration.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

// ---------------------------------------------------------------------------
// API Response Wrapper
// ---------------------------------------------------------------------------

/**
 * Standard shape returned by every successful API call.
 * All services should return `ApiResponse<T>` so consumers always know the shape.
 */
export interface ApiResponse<T> {
    data: T;
    message: string;
    statusCode: number;
}

// ---------------------------------------------------------------------------
// API Error
// ---------------------------------------------------------------------------

/**
 * Normalized error thrown by `apiClient` on non-2xx responses.
 * Catch this in services or components for typed error handling.
 */
export interface ApiError {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}

// ---------------------------------------------------------------------------
// Paginated Response
// ---------------------------------------------------------------------------

/**
 * Extension of ApiResponse for list endpoints that support pagination.
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// ---------------------------------------------------------------------------
// Request Configuration
// ---------------------------------------------------------------------------

/**
 * Optional config passed to `apiClient` methods to override defaults.
 */
export interface RequestConfig {
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>;
    signal?: AbortSignal;
    cache?: RequestCache;
    next?: { revalidate?: number | false; tags?: string[] };
}
