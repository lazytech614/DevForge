"use client";

import { ChangeEvent } from "react";

interface Props {
  onSchemaLoad: (
    schema: string
  ) => void;
}

export function PrismaFileUpload({
  onSchemaLoad,
}: Props) {
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = (event) => {
      const content =
        event.target?.result;

      if (
        typeof content === "string"
      ) {
        onSchemaLoad(content);
      }
    };

    reader.readAsText(file);
  };

  return (
    <input
      type="file"
      accept=".prisma,.txt"
      onChange={handleFileChange}
      className="block w-full rounded-md border p-2 text-sm"
    />
  );
}