import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";

import { cn } from "@/lib/utils";

function Toggle({
  className,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        "inline-flex items-center rounded-[var(--radius-pill)] border px-3 py-1 text-xs font-medium transition-colors data-[state=on]:border-[--color-deep-teal] data-[state=on]:bg-[--color-deep-teal] data-[state=on]:text-white hover:border-[--color-deep-teal] disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Toggle };
