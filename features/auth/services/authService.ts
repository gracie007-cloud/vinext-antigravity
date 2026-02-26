/*
 * File Name:     authService.ts
 * Description:   API calls for authentication — login, register, logout,
 *                token refresh, forgot/reset password.
 *                Example feature — delete or replace with your own.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

import { apiClient } from '@/lib/apiClient';
import { API_ENDPOINTS } from '@/constants/endpoints';
import type { ApiResponse } from '@/types/api.types';
import type {
    AuthResponse,
    ForgotPasswordRequest,
    LoginRequest,
    RegisterRequest,
    ResetPasswordRequest,
    User,
} from '../types/auth.types';

// ---------------------------------------------------------------------------
// Auth Service
// ---------------------------------------------------------------------------

/*
 * Function Name: login
 * Description:   Authenticates a user with email and password.
 * Parameters:    data (LoginRequest) — email and password.
 * Returns:       Promise<ApiResponse<AuthResponse>>
 */
export async function login(
    data: LoginRequest,
): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
}

/*
 * Function Name: register
 * Description:   Creates a new user account.
 * Parameters:    data (RegisterRequest) — name, email, password, confirmPassword.
 * Returns:       Promise<ApiResponse<AuthResponse>>
 */
export async function register(
    data: RegisterRequest,
): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
}

/*
 * Function Name: logout
 * Description:   Invalidates the current session on the server.
 * Parameters:    none
 * Returns:       Promise<ApiResponse<null>>
 */
export async function logout(): Promise<ApiResponse<null>> {
    return apiClient.post<null>(API_ENDPOINTS.AUTH.LOGOUT);
}

/*
 * Function Name: refreshToken
 * Description:   Exchanges a refresh token for a new access token.
 * Parameters:    refreshToken (string) — The current refresh token.
 * Returns:       Promise<ApiResponse<AuthResponse>>
 */
export async function refreshToken(
    token: string,
): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
        refreshToken: token,
    });
}

/*
 * Function Name: forgotPassword
 * Description:   Sends a password-reset email to the user.
 * Parameters:    data (ForgotPasswordRequest) — email.
 * Returns:       Promise<ApiResponse<null>>
 */
export async function forgotPassword(
    data: ForgotPasswordRequest,
): Promise<ApiResponse<null>> {
    return apiClient.post<null>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
}

/*
 * Function Name: resetPassword
 * Description:   Sets a new password using a reset token.
 * Parameters:    data (ResetPasswordRequest) — token, password, confirmPassword.
 * Returns:       Promise<ApiResponse<null>>
 */
export async function resetPassword(
    data: ResetPasswordRequest,
): Promise<ApiResponse<null>> {
    return apiClient.post<null>(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
}

/*
 * Function Name: getProfile
 * Description:   Fetches the authenticated user's profile.
 * Parameters:    none
 * Returns:       Promise<ApiResponse<User>>
 */
export async function getProfile(): Promise<ApiResponse<User>> {
    return apiClient.get<User>(API_ENDPOINTS.USERS.PROFILE);
}
