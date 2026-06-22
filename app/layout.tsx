import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

export const metadata = {
  metadataBase: new URL(
    //TODO: Change this to actual domain
    "https://your-domain.com"
  ),

  title: {
    default: "DevForge",
    template: "%s | DevForge",
  },

  description:
    "Developer tools for Prisma, SQL, APIs, JWT, rate limiting and more.",

  keywords: [
    "developer tools",
    "prisma visualizer",
    "jwt inspector",
    "sql explainer",
    "rate limiter",
    "dev tools",
  ],

  openGraph: {
    title: "DevForge",
    description:
      "A collection of modern developer tools.",

    siteName: "DevForge",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "DevForge",
    description:
      "Developer productivity tools.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <Navbar />
            <main className="container mx-auto min-h-screen px-4 py-10">
              {children}
            </main>
            <Footer />
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}