"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder || "Search..."} 
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border bg-background px-4 py-3 outline-none"
    />
  );
}