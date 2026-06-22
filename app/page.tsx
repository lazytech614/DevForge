"use client";

import { CategorySection } from "@/components/home/category-section";
import { PageHeader } from "@/components/shared/page-header";
import { SearchBar } from "@/components/shared/search-bar";
import { tools } from "@/lib/constants/tools";
import { useMemo, useState } from "react";

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

  return (
    <div className="space-y-10">
      <PageHeader
        title="Backend Playground"
        description="Interactive backend engineering tools and visualizations."
      />

      <SearchBar
        value={query}
        onChange={setQuery}
      />

      {Object.entries(grouped).map(
        ([category, categoryTools]) => (
          <CategorySection
            key={category}
            title={category}
            tools={categoryTools}
          />
        )
      )}
    </div>
  );
}