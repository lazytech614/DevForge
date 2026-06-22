import { ToolCard } from "../shared/tool-card";

interface Tool {
  slug: string;
  title: string;
  description: string;
}

interface CategorySectionProps {
  title: string;
  tools: Tool[];
}

export function CategorySection({
  title,
  tools,
}: CategorySectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="font-semibold text-2xl">
        {title}
      </h2>

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