"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search tools...",
}: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        <Search className="h-5 w-5" />
      </div>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-neutral-200 bg-white pl-11 pr-4 py-3.5 text-sm font-medium outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-neutral-400 focus:ring-2 focus:ring-neutral-900/5 dark:border-neutral-700 dark:bg-neutral-950 dark:focus:border-neutral-600 dark:focus:ring-neutral-100/10"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
}