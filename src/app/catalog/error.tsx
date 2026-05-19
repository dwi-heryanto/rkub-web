"use client";

export default function CatalogError({ reset }: { reset: () => void }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-white p-6 text-sm">
      Something went wrong while loading the catalog.
      <button onClick={reset} className="ml-3 rounded-xl bg-[--color-soft-peach] px-3 py-1 font-medium">
        Try again
      </button>
    </div>
  );
}
