import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <Card className="mx-auto max-w-md space-y-4 p-8 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-sm text-(--color-text-muted)">
        The page you&apos;re looking for has moved or no longer exists.
      </p>
      <div className="flex justify-center gap-3">
        <Link href="/" className={cn(buttonVariants())}>Back to Homepage</Link>
        <Link href="/catalog" className={cn(buttonVariants({ variant: "ghost" }))}>Browse Catalog</Link>
      </div>
    </Card>
  );
}
