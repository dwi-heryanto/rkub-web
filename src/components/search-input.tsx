"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

interface SearchResult {
  slug: string;
  name: string;
}

interface ClientSearchInputProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  /** Navigate to product detail on selection instead of catalog search */
  navigateToProduct?: boolean;
  /** Location label for analytics */
  location?: string;
}

export function ClientSearchInput({
  placeholder = "Search products...",
  className,
  inputClassName,
  navigateToProduct = true,
  location = "search_input",
}: ClientSearchInputProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Debounced autocomplete fetch
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?mode=autocomplete&query=${encodeURIComponent(query)}&limit=6`,
        );
        const data = await res.json();
        setResults(data.suggestions ?? []);
        setOpen(true);
      } catch {
        setResults([]);
      }
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (result: SearchResult) => {
      setOpen(false);
      setQuery(result.name);
      setHighlightIndex(-1);
      if (navigateToProduct) {
        router.push(`/products/${result.slug}`);
      } else {
        router.push(`/catalog?q=${encodeURIComponent(result.name)}`);
      }
    },
    [navigateToProduct, router],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || !results.length) {
      if (e.key === "Enter" && query.trim()) {
        e.preventDefault();
        router.push(`/catalog?q=${encodeURIComponent(query.trim())}`);
        setOpen(false);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIndex((prev) => (prev + 1) % results.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIndex((prev) => (prev - 1 + results.length) % results.length);
        break;
      case "Enter":
        e.preventDefault();
        if (highlightIndex >= 0 && results[highlightIndex]) {
          handleSelect(results[highlightIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setHighlightIndex(-1);
        break;
    }
  };

  // Parse suggestions from API (returns string[] of names) and map to results
  const mappedResults: SearchResult[] = results.map((r) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item = r as any;
    // API returns objects { slug, name } OR plain strings
    if (typeof item === "string") {
      return { slug: item.toLowerCase().replace(/\s+/g, "-"), name: item };
    }
    return { slug: item.slug ?? "", name: item.name ?? String(r) };
  });

  return (
    <div ref={containerRef} className={cn("relative", className)} data-analytics-location={location}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-(--color-text-muted)" />
      <input
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls="search-listbox"
        aria-autocomplete="list"
        aria-label="Search products"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setHighlightIndex(-1);
          if (!e.target.value.trim()) setResults([]);
        }}
        onFocus={() => results.length && setOpen(true)}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full rounded-full border border-border bg-white py-3 pl-12 pr-4 text-sm outline-hidden ring-primary/20 placeholder:text-(--color-text-muted) focus:ring-2",
          inputClassName,
        )}
      />
      {open && mappedResults.length > 0 ? (
        <ul
          role="listbox"
          id="search-listbox"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-white shadow-(--shadow-soft)"
        >
          {mappedResults.map((result, index) => (
            <li key={result.slug + index} role="option" aria-selected={index === highlightIndex}>
              <button
                type="button"
                onClick={() => handleSelect(result)}
                onMouseEnter={() => setHighlightIndex(index)}
                className={cn(
                  "flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors",
                  index === highlightIndex ? "bg-muted text-primary" : "text-foreground hover:bg-muted",
                )}
              >
                <Search className="h-4 w-4 text-(--color-text-muted)" />
                {result.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
