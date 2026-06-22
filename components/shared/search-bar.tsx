"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      placeholder="Search tools..."
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border bg-background px-4 py-3 outline-none"
    />
  );
}