import type { ButtonHTMLAttributes, ComponentProps } from "react";

import { Button } from "@/components/ui/button";

export interface ChipProps extends Omit<ComponentProps<typeof Button>, "variant" | "size" | "type"> {
  isActive?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export function Chip({ className, isActive, type, ...props }: ChipProps) {
  return (
    <Button type={type ?? "button"} variant={isActive ? "chipActive" : "chip"} size="chip" className={className} {...props} />
  );
}
