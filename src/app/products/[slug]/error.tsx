"use client";

export default function ProductError({ reset }: { reset: () => void }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-red-200 bg-[--color-surface] p-6 text-sm">
      Something went wrong while loading the product.
      <button onClick={reset} className="ml-3 rounded-[var(--radius-card)] bg-[--color-soft-peach] px-3 py-1 font-medium">
        Try again
      </button>
    </div>
  );
}
