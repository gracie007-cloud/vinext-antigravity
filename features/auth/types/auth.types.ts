/*
 * File Name:     auth.types.ts
 * Description:   Request and response types for the auth feature.
 *                Example feature — delete or replace with your own.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

// ---------------------------------------------------------------------------
// Request Types
// ---------------------------------------------------------------------------

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    token: string;
    password: string;
    confirmPassword: string;
}

// ---------------------------------------------------------------------------
// Response Types
// ---------------------------------------------------------------------------

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'admin' | 'user';
    createdAt: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
}
