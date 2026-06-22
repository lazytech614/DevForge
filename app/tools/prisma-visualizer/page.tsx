"use client";

import { useMemo, useState } from "react";
import { generateFlow } from "@/lib/generators/prisma-flow";
import { samplePrismaSchema } from "@/lib/examples/prisma-schema";
import { parsePrismaSchema } from "@/lib/parsers/prisma-perser";
import { ToolLayout } from "@/components/layout/tool-layout";
import { CodeEditor } from "@/components/editor/monaco-editor";
import PrismaDiagram from "@/components/diagrams/prisma-diagram";

export default function PrismaVisualizerPage() {
  const [schema, setSchema] = useState(
    samplePrismaSchema
  );

  const { nodes, edges } = useMemo(() => {
    const parsed =
      parsePrismaSchema(schema);

    return generateFlow(parsed);
  }, [schema]);

  return (
    <ToolLayout
      title="Prisma Schema Visualizer"
      description="Convert Prisma schemas into interactive ER diagrams."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <CodeEditor
            language="sql"
            value={schema}
            onChange={setSchema}
          />
        </div>

        <div>
          <PrismaDiagram
            nodes={nodes}
            edges={edges}
          />
        </div>
      </div>
    </ToolLayout>
  );
}