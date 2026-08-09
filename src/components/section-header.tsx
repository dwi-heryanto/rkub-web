import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
}

export function SectionHeader({ title, description, viewAllHref, viewAllLabel = "View all", className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-3", className)}>
      <div className="max-w-2xl space-y-2">
        <h2 className="font-[var(--font-display)] text-[var(--text-2xl)] font-semibold leading-tight text-[var(--color-ink)] sm:text-[var(--text-3xl)]">
          {title}
        </h2>
        {description ? <p className="text-[var(--color-ink-2)]">{description}</p> : null}
      </div>
      {viewAllHref ? (
        <Link href={viewAllHref} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-opacity hover:opacity-80">
          {viewAllLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}