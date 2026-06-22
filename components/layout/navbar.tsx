"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ModeToggle } from "./mode-toggle";
import { Menu, X, Code2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/tools", label: "Tools" },
  { href: "/playground", label: "Playground" },
];

export function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200",
          scrolled
            ? "border-b bg-background/80 backdrop-blur-md shadow-sm"
            : "border-b border-transparent bg-background"
        )}
      >
        <div className="container mx-auto flex h-14 items-center gap-4 px-4 md:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-base shrink-0 group"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Code2 className="h-4 w-4" />
            </span>
            <span className="tracking-tight">DevForge</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 text-sm rounded-md transition-colors duration-150",
                  pathname === link.href
                    ? "text-foreground font-medium bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2">
            <ModeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted transition-colors"
              aria-label="Open navigation"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar panel */}
          <aside className="absolute right-0 top-0 h-full w-72 bg-background border-l flex flex-col shadow-xl animate-in slide-in-from-right duration-200">
            {/* Sidebar header */}
            <div className="flex items-center justify-between px-5 h-14 border-b shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold text-sm"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Code2 className="h-3.5 w-3.5" />
                </span>
                DevForge
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-center h-7 w-7 rounded-md hover:bg-muted transition-colors"
                aria-label="Close navigation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground px-3 pb-2">
                Navigation
              </p>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors group",
                    pathname === link.href
                      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                  <ChevronRight
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      pathname === link.href
                        ? "opacity-100 text-primary"
                        : "opacity-0 group-hover:opacity-50"
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* Sidebar footer */}
            <div className="border-t px-5 py-4 shrink-0">
              <p className="text-xs text-muted-foreground">
                Built for developers
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}