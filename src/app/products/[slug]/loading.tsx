export default function ProductLoading() {
  return (
    <div className="space-y-8 pb-24" aria-busy="true" aria-live="polite">
      {/* Breadcrumb skeleton */}
      <div className="flex gap-2">
        <div className="h-4 w-12 animate-pulse rounded bg-muted" />
        <div className="h-4 w-4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        <div className="h-4 w-4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
      </div>

      {/* Main content grid skeleton */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          {/* Main image */}
          <div className="aspect-[3/2] animate-pulse rounded-2xl bg-muted" />
          {/* Gallery thumbnails */}
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </div>
        <div className="space-y-5 lg:col-span-5">
          {/* Product heading */}
          <div className="space-y-2">
            <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
          </div>
          {/* Aliases */}
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-6 w-16 animate-pulse rounded-full bg-muted" />
            ))}
          </div>
          {/* Description */}
          <div className="space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
            <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
          </div>
          {/* Highlight panel */}
          <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
          {/* Attributes grid */}
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
          {/* CTA button */}
          <div className="h-11 w-full animate-pulse rounded-[var(--radius-card)] bg-muted" />
        </div>
      </div>
    </div>
  );
}
