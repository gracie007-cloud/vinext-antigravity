/*
 * File Name:     index.ts
 * Description:   Barrel export for the auth feature. Other code imports
 *                from this file only — never from internals.
 *                Example feature — delete or replace with your own.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

// Services
export {
    login,
    register,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
    getProfile,
} from './services/authService';

// Types
export type {
    LoginRequest,
    RegisterRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    User,
    AuthTokens,
    AuthResponse,
} from './types/auth.types';
