import { Handle, Position } from "@xyflow/react";

export default function PrismaNode({
  data,
}: any) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
      />

      <div className="min-w-55 overflow-hidden rounded-xl border bg-background shadow-lg">
        <div className="flex items-center justify-between border-b bg-primary/10 px-4 py-2">
          <p className="font-semibold">
            {data.name}
          </p>

          <span className="rounded bg-primary/20 px-2 py-0.5 text-xs">
            MODEL
          </span>
        </div>

        <div className="space-y-1 p-3 text-sm">
          {data.fields.map((field: any) => {
            const isRelation = field.type.includes("[]");

            return <div
              key={field.name}
              className="flex justify-between rounded px-2 py-1 hover:bg-muted"
            >
              <span>{field.name}</span>

              <span className={isRelation ? "text-blue-500" : "text-muted-foreground"}>
                {field.type}
              </span>
            </div>
          })}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
      />
    </>
  );
}