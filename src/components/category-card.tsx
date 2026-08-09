import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

import type { Category } from "@/types/catalog";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Pick<Category, "name" | "description" | "slug">;
  href: string;
  image?: {
    src: string;
    alt: string;
  };
  icon?: LucideIcon;
  className?: string;
}

export function CategoryCard({ category, href, image, icon: Icon, className }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block h-full rounded-[var(--radius-lg)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <div className="space-y-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(var(--radius-lg)-4px)] bg-[var(--color-paper)]">
          {image ? (
            <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
          ) : Icon ? (
            <div className="flex h-full items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)]/8 text-[var(--color-accent)]">
                <Icon className="h-7 w-7" />
              </span>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,var(--color-paper)_0%,var(--color-paper-2)_100%)] text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-2)]">
              {category.slug.replace(/-/g, " ")}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-[var(--color-ink)]">{category.name}</h3>
            {category.description ? <p className="mt-1 line-clamp-2 text-sm text-[var(--color-ink-2)]">{category.description}</p> : null}
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-accent)] transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}