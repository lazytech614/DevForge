import { ReactNode } from "react";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function ToolLayout({
  title,
  description,
  children,
}: ToolLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="font-bold text-3xl">
          {title}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}