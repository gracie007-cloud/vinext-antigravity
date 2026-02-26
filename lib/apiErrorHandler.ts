/*
 * File Name:     apiErrorHandler.ts
 * Description:   Central utility for handling API errors. Normalizes unknown
 *                caught values into user-friendly messages and displays them
 *                as toast notifications via sonner. Components call
 *                `handleApiError()` in their catch blocks — never raw toast.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

import { toast } from 'sonner';
import { ApiError, isApiError } from '@/types/api.types';

// ---------------------------------------------------------------------------
// Status Code → Default Message Map
// ---------------------------------------------------------------------------

const STATUS_MESSAGES: Record<number, string> = {
    400: 'Invalid request. Please check your input.',
    401: 'Session expired. Please log in again.',
    403: 'You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    408: 'Request timed out. Please try again.',
    409: 'A conflict occurred. The resource may have been modified.',
    422: 'Validation failed. Please correct the highlighted fields.',
    429: 'Too many requests. Please wait a moment and try again.',
    500: 'An unexpected server error occurred. Please try again later.',
    502: 'Server is temporarily unavailable. Please try again later.',
    503: 'Service is under maintenance. Please try again later.',
};

const FALLBACK_MESSAGE = 'Something went wrong. Please try again.';

// ---------------------------------------------------------------------------
// Error Message Resolution
// ---------------------------------------------------------------------------

/*
 * Function Name: getApiErrorMessage
 * Description:   Extracts a user-friendly message from an unknown error value.
 *                Checks for ApiError first, then falls back to Error.message,
 *                then the provided fallback, then a generic message.
 * Parameters:    error (unknown) — The caught error.
 *                fallbackMessage (string?) — Optional custom fallback.
 * Returns:       string — A user-facing error message.
 */
export function getApiErrorMessage(
    error: unknown,
    fallbackMessage?: string,
): string {
    if (isApiError(error)) {
        // Prefer the server's message; fall back to status-code default
        return (
            error.message ||
            STATUS_MESSAGES[error.statusCode] ||
            fallbackMessage ||
            FALLBACK_MESSAGE
        );
    }

    if (error instanceof Error) {
        // Network errors, AbortError, TypeError, etc.
        if (error.name === 'AbortError') {
            return 'Request was cancelled.';
        }
        if (error.message === 'Failed to fetch') {
            return 'Network error. Please check your connection.';
        }
        return error.message || fallbackMessage || FALLBACK_MESSAGE;
    }

    return fallbackMessage || FALLBACK_MESSAGE;
}

// ---------------------------------------------------------------------------
// Validation Error Formatting
// ---------------------------------------------------------------------------

/*
 * Function Name: getValidationErrors
 * Description:   Extracts field-level validation errors from an ApiError.
 *                Returns a flat record of { fieldName: firstErrorMessage }.
 *                Useful for mapping server errors onto form fields.
 * Parameters:    error (ApiError) — The API error with `errors` record.
 * Returns:       Record<string, string> — Field name → first error message.
 */
export function getValidationErrors(
    error: ApiError,
): Record<string, string> {
    if (!error.errors) return {};

    return Object.fromEntries(
        Object.entries(error.errors).map(([field, messages]) => [
            field,
            messages[0] ?? 'Invalid value',
        ]),
    );
}

// ---------------------------------------------------------------------------
// Primary Error Handler
// ---------------------------------------------------------------------------

/*
 * Function Name: handleApiError
 * Description:   Catches an unknown error, shows a toast notification,
 *                and returns the normalized ApiError (or null for non-API
 *                errors). This is the ONE function components call in their
 *                catch blocks.
 * Parameters:    error (unknown) — The caught error.
 *                fallbackMessage (string?) — Optional custom fallback message.
 * Returns:       ApiError | null — The typed error if it was an ApiError.
 */
export function handleApiError(
    error: unknown,
    fallbackMessage?: string,
): ApiError | null {
    const message = getApiErrorMessage(error, fallbackMessage);

    // Show toast
    toast.error(message);

    // Return typed error for further handling (e.g. form field errors)
    return isApiError(error) ? error : null;
}
