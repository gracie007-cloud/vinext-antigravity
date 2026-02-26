/*
 * File Name:     vitest.config.ts
 * Description:   Vitest configuration for unit and integration tests.
 *                Sets up jsdom, path aliases, and coverage thresholds.
 * Author:        Yasir Khan
 * Created Date:  2026-02-26
 */

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./test/setup.ts"],
        include: ["**/*.test.{ts,tsx}"],
        exclude: ["node_modules", "dist", ".next", ".vinext"],
        coverage: {
            provider: "v8",
            reporter: ["text", "lcov"],
            include: ["app/**", "components/**", "features/**", "hooks/**", "lib/**"],
            exclude: ["**/*.test.{ts,tsx}", "test/**", "components/ui/**"],
            thresholds: {
                statements: 80,
                branches: 80,
                functions: 80,
                lines: 80,
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "."),
        },
    },
});
