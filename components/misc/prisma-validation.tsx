"use client";

interface Props {
  errors: string[];

  modelCount: number;
  enumCount: number;
  relationCount: number;
}

export function PrismaValidation({
  errors,
  modelCount,
  enumCount,
  relationCount,
}: Props) {
  const isValid =
    errors.length === 0;

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">
          Schema Validation
        </h3>

        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            isValid
              ? "bg-green-500/10 text-green-500"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {isValid
            ? "Valid"
            : `${errors.length} Issue${
                errors.length > 1
                  ? "s"
                  : ""
              }`}
        </span>
      </div>

      {isValid ? (
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
          <p className="font-medium text-green-500">
            ✓ Parsed successfully
          </p>

          <p className="mt-2 text-xs text-muted-foreground">
            {modelCount} model
            {modelCount !== 1
              ? "s"
              : ""}
            {" • "}
            {enumCount} enum
            {enumCount !== 1
              ? "s"
              : ""}
            {" • "}
            {relationCount} relation
            {relationCount !== 1
              ? "s"
              : ""}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {errors.map(
            (error, index) => (
              <div
                key={index}
                className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-500"
              >
                ⚠ {error}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}