import Link from "next/link";
import { Code2, GitFork } from "lucide-react";

const footerLinks = {
  Tools: [
    { label: "Prisma Visualizer", href: "/tools/prisma" },
    { label: "JWT Inspector", href: "/tools/jwt" },
    { label: "SQL Explainer", href: "/tools/sql" },
    { label: "Rate Limiter", href: "/tools/rate-limiter" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Changelog", href: "/changelog" },
    { label: "API Reference", href: "/docs/api" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Top section */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold text-sm mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Code2 className="h-3.5 w-3.5" />
              </span>
              DevForge
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-50">
              A focused set of tools built for developers who care about their workflow.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <GitFork className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
                {group}
              </p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DevForge. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for developers, by developers.
          </p>
        </div>
      </div>
    </footer>
  );
}