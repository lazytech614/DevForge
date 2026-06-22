import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
}

export function ToolCard({
  title,
  description,
  href,
}: ToolCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full transition-all hover:border-primary hover:shadow-md">
        <CardContent className="flex h-full flex-col justify-between p-6">
          <div>
            <h3 className="mb-2 font-semibold text-lg">
              {title}
            </h3>

            <p className="text-muted-foreground text-sm">
              {description}
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm font-medium">
            Open Tool
            <ArrowRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}