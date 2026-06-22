interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <div className="space-y-4 text-center">
      <h1 className="font-bold text-4xl tracking-tight">
        {title}
      </h1>

      <p className="mx-auto max-w-2xl text-muted-foreground">
        {description}
      </p>
    </div>
  );
}