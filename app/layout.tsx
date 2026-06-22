import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Backend Playground",
  description: "Developer tools and visualizers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main className="container mx-auto min-h-screen px-4 py-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}