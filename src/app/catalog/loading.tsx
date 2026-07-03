import { Card } from "@/components/ui/card";

export default function CatalogLoading() {
  return (
    <div className="space-y-12 pb-12" aria-busy="true" aria-live="polite">
      {/* Hero skeleton */}
      <div className="h-64 animate-pulse rounded-4xl bg-muted" />

      {/* Tab pills skeleton */}
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-24 animate-pulse rounded-full bg-muted" />
        ))}
      </div>

      {/* Product grid skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="h-80 animate-pulse overflow-hidden p-0">
            <div className="h-44 w-full bg-muted" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted" />
              <div className="h-3 w-2/3 rounded bg-muted" />
              <div className="mt-4 h-8 w-full rounded bg-muted" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
