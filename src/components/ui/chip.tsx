import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

export interface ChipProps extends Omit<ComponentProps<typeof Button>, "variant"> {
  isActive?: boolean;
}

export function Chip({ className, isActive, ...props }: ChipProps) {
  return <Button type={props.type ?? "button"} variant={isActive ? "chipActive" : "chip"} className={className} {...props} />;
}
