"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function FilterSelect({
  tab,
  paramKey,
  label,
  allLabel,
  options,
  currentValue,
}: {
  tab: string;
  paramKey: string;
  label: string;
  allLabel: string;
  options: string[];
  currentValue: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigate = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    if (value) {
      params.set(paramKey, value);
    } else {
      params.delete(paramKey);
    }
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <select
      aria-label={label}
      value={currentValue}
      onChange={(event) => navigate(event.target.value)}
      className="w-full rounded-input border border-(--color-rule) bg-(--color-paper-2) px-3 py-2 text-sm text-(--color-ink)"
    >
      <option value="">{allLabel}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
