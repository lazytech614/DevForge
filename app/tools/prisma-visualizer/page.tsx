"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import * as htmlToImage from "html-to-image";

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
  const [schema, setSchema] = useState(samplePrismaSchema);
  const [diagramKey, setDiagramKey] = useState(0);

  const diagramRef = useRef<HTMLDivElement>(null);

  const parsed = useMemo(
    () => parsePrismaSchema(schema),
    [schema]
  );

  const flow = useMemo(() => {
    return generateFlow(parsed);
  }, [parsed]);


  useEffect(() => {
    setDiagramKey((prev) => prev + 1);
  }, [schema]);

  const fieldCount = parsed.models.reduce(
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

  const handleExport = async () => {
    if (!diagramRef.current) return;

    const dataUrl = await htmlToImage.toPng(diagramRef.current, {cacheBust: true,});
    const link = document.createElement("a");
    link.download = "prisma-diagram.png";
    link.href = dataUrl;
    link.click();
  };

  const handleFullscreen = async () => {
    if (!diagramRef.current) return;

    await diagramRef.current.requestFullscreen();
  };

  const handleAutoLayout = () => {
    setDiagramKey((prev) => prev + 1);
  };

  const handleExportJson = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          parsed,
          null,
          2
        ),
      ],
      {
        type:
          "application/json",
      }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "prisma-schema.json";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="Prisma Schema Visualizer"
      description="Convert Prisma schemas into interactive ER diagrams."
    >
      <div className="space-y-6">
        <PrismaStats
          models={parsed.models.length}
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
          onExport={handleExport}
          onAutoLayout={handleAutoLayout}
          onFullscreen={handleFullscreen}
          onExportJson={handleExportJson}
        />

        <PrismaFileUpload
          onSchemaLoad={setSchema}
        />

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <CodeEditor
              language="sql"
              value={schema}
              onChange={setSchema}
            />
          </div>

          <div className="lg:col-span-3">
            <PrismaDiagram
              ref={diagramRef}
              key={diagramKey}
              initialNodes={flow.nodes}
              initialEdges={flow.edges}
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}