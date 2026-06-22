import { PrismaStatsProps } from "@/types/prisma";

export function PrismaStats({
  models,
  fields,
  relations,
}: PrismaStatsProps) {
  const stats = [
    {
      label: "Models",
      value: models,
    },
    {
      label: "Fields",
      value: fields,
    },
    {
      label: "Relations",
      value: relations,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border p-4 text-center"
        >
          <div className="text-2xl font-bold">
            {stat.value}
          </div>

          <div className="text-sm text-muted-foreground">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}