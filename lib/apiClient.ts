/*
 * File Name:     apiClient.ts
 * Description:   Base HTTP service wrapping native fetch. All API calls in
 *                the application flow through this single module. Handles
 *                default headers, auth token injection, query-string building,
 *                response parsing, and error normalization.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

import type { ApiError, ApiResponse, RequestConfig } from '@/types/api.types';

// ---------------------------------------------------------------------------
// Auth Token Getter
// ---------------------------------------------------------------------------
// Decouples the client from any specific auth-state library.
// Call `setAuthTokenGetter` once during app bootstrap (e.g. in a provider)
// to wire up your token source.
// ---------------------------------------------------------------------------

type TokenGetter = () => string | null;
let getAuthToken: TokenGetter = () => null;

/*
 * Function Name: setAuthTokenGetter
 * Description:   Registers a function the client calls before every request
 *                to read the current auth token. Set this once at app startup.
 * Parameters:    getter (TokenGetter) — Returns the token string or null.
 * Returns:       void
 */
export function setAuthTokenGetter(getter: TokenGetter): void {
    getAuthToken = getter;
}

// ---------------------------------------------------------------------------
// Internal Helpers
// ---------------------------------------------------------------------------

/*
 * Function Name: buildUrl
 * Description:   Appends query-string parameters to a URL.
 * Parameters:    url (string), params (Record | undefined)
 * Returns:       string — The URL with query-string appended.
 */
function buildUrl(
    url: string,
    params?: Record<string, string | number | boolean>,
): string {
    if (!params) return url;
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        query.append(key, String(value));
    });
    return `${url}?${query.toString()}`;
}

/*
 * Function Name: buildHeaders
 * Description:   Merges default headers with any overrides. Injects
 *                Authorization header when a token is available.
 * Parameters:    custom (Record | undefined)
 * Returns:       Record<string, string>
 */
function buildHeaders(
    custom?: Record<string, string>,
): Record<string, string> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...custom,
    };

    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
}

/*
 * Function Name: handleResponse
 * Description:   Parses a fetch Response. Throws a typed ApiError on non-2xx.
 * Parameters:    response (Response)
 * Returns:       Promise<T>
 */
async function handleResponse<T>(response: Response): Promise<T> {
    // Handle 204 No Content
    if (response.status === 204) {
        return undefined as T;
    }

    const body = await response.json();

    if (!response.ok) {
        const error: ApiError = {
            message: body.message ?? response.statusText,
            statusCode: response.status,
            errors: body.errors,
        };
        throw error;
    }

    return body as T;
}

// ---------------------------------------------------------------------------
// Core Request Function
// ---------------------------------------------------------------------------

/*
 * Function Name: request
 * Description:   Executes an HTTP request using native fetch. All public
 *                methods (get, post, put, patch, del) delegate here.
 * Parameters:    url (string), method (string), config (RequestConfig),
 *                body (unknown | undefined)
 * Returns:       Promise<T>
 */
async function request<T>(
    url: string,
    method: string,
    config: RequestConfig = {},
    body?: unknown,
): Promise<T> {
    const fullUrl = buildUrl(url, config.params);
    const headers = buildHeaders(config.headers);

    const fetchOptions: RequestInit = {
        method,
        headers,
        signal: config.signal,
        cache: config.cache,
    };

    // Attach body for non-GET requests
    if (body !== undefined) {
        fetchOptions.body = JSON.stringify(body);
    }

    // Next.js extended fetch options (revalidate / tags)
    if (config.next) {
        (fetchOptions as Record<string, unknown>).next = config.next;
    }

    const response = await fetch(fullUrl, fetchOptions);
    return handleResponse<T>(response);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export const apiClient = {
    /*
     * Function Name: get
     * Description:   Sends a GET request.
     * Parameters:    url (string), config (RequestConfig)
     * Returns:       Promise<ApiResponse<T>>
     */
    get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
        return request<ApiResponse<T>>(url, 'GET', config);
    },

    /*
     * Function Name: post
     * Description:   Sends a POST request with a JSON body.
     * Parameters:    url (string), data (unknown), config (RequestConfig)
     * Returns:       Promise<ApiResponse<T>>
     */
    post<T>(
        url: string,
        data?: unknown,
        config?: RequestConfig,
    ): Promise<ApiResponse<T>> {
        return request<ApiResponse<T>>(url, 'POST', config, data);
    },

    /*
     * Function Name: put
     * Description:   Sends a PUT request with a JSON body.
     * Parameters:    url (string), data (unknown), config (RequestConfig)
     * Returns:       Promise<ApiResponse<T>>
     */
    put<T>(
        url: string,
        data?: unknown,
        config?: RequestConfig,
    ): Promise<ApiResponse<T>> {
        return request<ApiResponse<T>>(url, 'PUT', config, data);
    },

    /*
     * Function Name: patch
     * Description:   Sends a PATCH request with a JSON body.
     * Parameters:    url (string), data (unknown), config (RequestConfig)
     * Returns:       Promise<ApiResponse<T>>
     */
    patch<T>(
        url: string,
        data?: unknown,
        config?: RequestConfig,
    ): Promise<ApiResponse<T>> {
        return request<ApiResponse<T>>(url, 'PATCH', config, data);
    },

    /*
     * Function Name: del
     * Description:   Sends a DELETE request. Named `del` to avoid JS keyword.
     * Parameters:    url (string), config (RequestConfig)
     * Returns:       Promise<ApiResponse<T>>
     */
    del<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
        return request<ApiResponse<T>>(url, 'DELETE', config);
    },
};
