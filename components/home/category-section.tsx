import { ChevronRight } from "lucide-react";
import { ToolCard } from "../shared/tool-card";

interface Tool {
  slug: string;
  title: string;
  description: string;
}

interface CategorySectionProps {
  title: string;
  tools: Tool[];
  icon?: React.ReactNode;
}

export function CategorySection({
  title,
  tools,
  icon,
}: CategorySectionProps) {
  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          {icon && <div className="text-neutral-600 dark:text-neutral-400">{icon}</div>}
          <div>
            <h2 className="font-bold text-2xl tracking-tight text-neutral-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {tools.length} {tools.length === 1 ? "tool" : "tools"}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center text-neutral-400 dark:text-neutral-600">
          <ChevronRight className="h-5 w-5" />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard
            key={tool.slug}
            title={tool.title}
            description={tool.description}
            href={`/tools/${tool.slug}`}
          />
        ))}
      </div>
    </section>
  );
}