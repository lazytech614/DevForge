"use client";

import { useMemo, useState } from "react";
import { Zap } from "lucide-react";

import { tools } from "@/lib/constants/tools";

import { CategorySection } from "@/components/home/category-section";
import { PageHeader } from "@/components/shared/page-header";
import { SearchBar } from "@/components/shared/search-bar";

//TODO: Map categories to icons - customize based on your categories
const categoryIcons: Record<string, React.ReactNode> = {
  // "API": <Globe className="h-5 w-5" />,
  // "Database": <Database className="h-5 w-5" />,
  // "Utility": <Zap className="h-5 w-5" />,
};

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) =>
      `${tool.title} ${tool.description} ${tool.category}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [query]);

  const grouped = filteredTools.reduce(
    (acc, tool) => {
      acc[tool.category] ??= [];
      acc[tool.category].push(tool);
      return acc;
    },
    {} as Record<string, typeof tools>
  );

  const resultsCount = Object.values(grouped).reduce(
    (sum, tools) => sum + tools.length,
    0
  );

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <PageHeader
        title="DevForge"
        description="Interactive backend engineering tools and visualizations. Everything you need to build, test, and debug with ease."
        icon={Zap}
        variant="gradient"
      />

      {/* Search and Results Section */}
      <div className="space-y-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search tools by name, description, or category..."
        />

        {/* Results Counter */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {query ? (
              <>
                Found <span className="font-semibold text-neutral-900 dark:text-white">{resultsCount}</span> {resultsCount === 1 ? "tool" : "tools"}
              </>
            ) : (
              <>
                <span className="font-semibold text-neutral-900 dark:text-white">{resultsCount}</span> {resultsCount === 1 ? "tool" : "tools"} available
              </>
            )}
          </p>

          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Categories Section */}
      <div className="space-y-12">
        {Object.entries(grouped).length > 0 ? (
          Object.entries(grouped).map(([category, categoryTools]) => (
            <CategorySection
              key={category}
              title={category}
              tools={categoryTools}
              icon={categoryIcons[category]}
            />
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 py-12 text-center dark:border-neutral-700 dark:bg-neutral-900">
            <p className="text-muted-foreground">
              No tools found for <span className="font-semibold">"{query}"</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
}