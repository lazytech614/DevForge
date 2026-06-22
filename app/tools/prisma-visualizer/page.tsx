"use client";

import { useMemo, useState } from "react";

import { samplePrismaSchema } from "@/lib/examples/prisma-schema";
import { parsePrismaSchema } from "@/lib/parsers/prisma-perser";
import { generateFlow } from "@/lib/generators/prisma-flow";

import { ToolLayout } from "@/components/layout/tool-layout";
import { CodeEditor } from "@/components/editor/monaco-editor";
import PrismaDiagram from "@/components/diagrams/prisma-diagram";
import { PrismaStats } from "@/components/misc/prisma-stats";
import { PrismaToolbar } from "@/components/misc/prisma-toolbar";
import { PrismaFileUpload } from "@/components/misc/prisma-file-upload";
import { toast } from "sonner";

export default function PrismaVisualizerPage() {
  const [schema, setSchema] =
    useState(samplePrismaSchema);

  const parsed = useMemo(
    () => parsePrismaSchema(schema),
    [schema]
  );

  const { nodes, edges } =
    useMemo(() => {
      return generateFlow(parsed);
    }, [parsed]);

  const fieldCount =
    parsed.models.reduce(
      (acc, model) =>
        acc + model.fields.length,
      0
    );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      schema
    );

    toast.success(
      "Schema copied successfully"
    );
  };

  return (
    <ToolLayout
      title="Prisma Schema Visualizer"
      description="Convert Prisma schemas into interactive ER diagrams."
    >
      <div className="space-y-6">
        <PrismaStats
          models={
            parsed.models.length
          }
          fields={fieldCount}
          relations={
            parsed.relations.length
          }
        />

        <PrismaToolbar
          onLoadExample={() =>
            setSchema(
              samplePrismaSchema
            )
          }
          onClear={() =>
            setSchema("")
          }
          onCopy={handleCopy}
        />

        <PrismaFileUpload
          onSchemaLoad={setSchema}
        />

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
      </div>
    </ToolLayout>
  );
}