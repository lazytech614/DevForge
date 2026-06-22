"use client";

import { Button } from "@/components/ui/button";

interface PrismaToolbarProps {
  onLoadExample: () => void;
  onClear: () => void;
  onCopy: () => void;
}

export function PrismaToolbar({
  onLoadExample,
  onClear,
  onCopy,
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
    </div>
  );
}