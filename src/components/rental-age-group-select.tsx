"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface RentalAgeGroupSelectProps {
  currentAgeGroup: string;
  currentRegion: string;
  currentGender: string;
}

export function RentalAgeGroupSelect({
  currentAgeGroup,
  currentRegion,
  currentGender,
}: RentalAgeGroupSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigate = (ageGroup: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "rental");
    if (ageGroup) {
      params.set("ageGroup", ageGroup);
    } else {
      params.delete("ageGroup");
    }
    if (!currentRegion) params.delete("region");
    if (!currentGender) params.delete("gender");
    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <select
      id="age-group-select"
      aria-label="Age Group"
      defaultValue={currentAgeGroup}
      onChange={(e) => navigate(e.target.value)}
      className="mt-2 w-full rounded-2xl border border-border bg-white px-3 py-2 text-sm"
    >
      <option value="">All Ages</option>
      <option value="Adult">Adult</option>
      <option value="Teen">Teen</option>
      <option value="Child">Child (5-12)</option>
      <option value="Toddler">Toddler</option>
    </select>
  );
}
