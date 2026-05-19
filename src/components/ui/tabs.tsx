"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ items, className }: { items: TabItem[]; className?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const activeItem = items.find((item) => item.id === active) || items[0];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={cn(
              "rounded-[var(--radius-pill)] border px-4 py-2 text-sm font-semibold",
              active === item.id
                ? "border-[--color-deep-teal] bg-[--color-deep-teal] text-white"
                : "border-[--color-border] bg-white text-[--color-text] hover:border-[--color-deep-teal]",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="rounded-[var(--radius-card)] border border-[--color-border] bg-[--color-surface] p-6">
        {activeItem?.content}
      </div>
    </div>
  );
}
