"use client";

import { Button } from "@/components/ui/button";

interface PrismaToolbarProps {
  onLoadExample: () => void;
  onClear: () => void;
  onCopy: () => void;
  onExport: () => void;
  onAutoLayout: () => void;
  onFullscreen: () => void;
  onExportJson: () => void;
}

export function PrismaToolbar({
  onLoadExample,
  onClear,
  onCopy,
  onExport,
  onAutoLayout,
  onFullscreen,
  onExportJson
}: PrismaToolbarProps) {

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={onLoadExample}
      >
        Load Example
      </Button>

      <Button
        variant="outline"
        onClick={onClear}
      >
        Clear
      </Button>

      <Button onClick={onCopy}>
        Copy Schema
      </Button>

      <Button
        variant="default"
        onClick={onExport}
      >
        Export PNG
      </Button>

      <Button
        onClick={onAutoLayout}
      >
        Auto Layout
      </Button>

      <Button
        onClick={onFullscreen}
      >
        Full Screen
      </Button>

      <Button
        onClick={onExportJson}
      >
        Export JSON
      </Button>
    </div>
  );
}