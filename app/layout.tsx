/*
 * File Name:     layout.tsx
 * Description:   Root layout for the application, defining document structure
 *                and wrapping children with global providers.
 * Author:        Antigravity
 * Created Date:  2024-02-26
 */

import { Metadata } from 'vinext/shims/metadata'
import { Inter } from 'vinext/shims/font-google'
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "vinext — Edge-First Frontend Template",
  description:
    "Production-ready frontend template powered by vinext. React 19, Tailwind v4, shadcn/ui, and GSAP — deployed to Cloudflare Workers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}