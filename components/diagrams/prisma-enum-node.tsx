import {
  Handle,
  Position,
} from "@xyflow/react";

export default function PrismaEnumNode({
  data,
}: any) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
      />

      <div className="min-w-55 overflow-hidden rounded-xl border border-purple-500 bg-background shadow-lg">
        <div className="flex items-center justify-between border-b border-purple-500 bg-purple-500/10 px-4 py-2">
            <p className="font-semibold">
            {data.name}
            </p>

            <span className="rounded bg-purple-500/20 px-2 py-0.5 text-xs">
                ENUM
            </span>
        </div>

        <div className="space-y-1 p-3 text-sm">
          {data.values.map(
            (value: string) => (
              <div
                key={value}
                className="rounded px-2 py-1"
              >
                {value}
              </div>
            )
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
      />
    </>
  );
}