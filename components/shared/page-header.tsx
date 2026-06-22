"use client";

import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  variant?: "modern" | "minimal" | "gradient";
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  variant = "modern",
}: PageHeaderProps) {
  if (variant === "minimal") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 p-2.5">
              <Icon className="h-6 w-6 text-white" />
            </div>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {title}
          </h1>
        </div>
        <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div className="relative overflow-hidden rounded-2xl px-6 py-16 sm:px-12 sm:py-20">
        {/* Light Mode Background */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 dark:hidden" />

        {/* Dark Mode Background */}
        <div className="absolute inset-0 hidden bg-linear-to-br from-slate-950 via-blue-950/50 to-slate-900 dark:block" />

        {/* Accent Elements */}
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-400/30 blur-3xl dark:bg-blue-600/20" />
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-cyan-400/30 blur-3xl dark:bg-cyan-600/20" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{
          backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 76%, transparent 77%, transparent)",
          backgroundSize: "60px 60px"
        }} />

        {/* Content */}
        <div className="relative space-y-4">
          {Icon && (
            <div className="inline-flex rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 p-3 shadow-lg">
              <Icon className="h-8 w-8 text-white" />
            </div>
          )}

          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-6xl">
            {title}
          </h1>

          <p className="max-w-3xl text-lg text-neutral-700 dark:text-neutral-300">
            {description}
          </p>
        </div>
      </div>
    );
  }

  // Modern variant (default)
  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm px-6 py-16 sm:px-12 sm:py-20">
      {/* Background Gradient Accent */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50/40 via-transparent to-cyan-50/40 dark:from-blue-950/20 dark:via-transparent dark:to-cyan-950/20" />

      {/* Floating Elements */}
      <div className="absolute -right-32 top-10 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl dark:bg-blue-500/10" />
      <div className="absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/10" />

      {/* Content */}
      <div className="relative space-y-5">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="inline-flex rounded-xl bg-linear-to-br from-blue-500 via-blue-500 to-cyan-500 p-3 shadow-lg shadow-blue-500/30">
              <Icon className="h-7 w-7 text-white" />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-6xl">
            {title}
          </h1>

          <p className="max-w-3xl text-lg text-neutral-600 dark:text-neutral-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}