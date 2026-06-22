"use client";

import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

export function CodeEditor({
  language,
  value,
  onChange,
}: CodeEditorProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Editor
        height="500px"
        language={language}
        value={value}
        theme="vs-dark"
        onChange={(v) => onChange(v || "")}
      />
    </div>
  );
}