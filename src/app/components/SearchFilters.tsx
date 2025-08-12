"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "@/app/components/Dropdown";

type Facets = {
  cities: string[];
  degrees: string[];
  specialties: string[];
};

export type Filters = {
  q?: string;
  city?: string[];
  degree?: string[];
  specialties?: string[];
  yoeRange?: string;
};

interface Props {
  filters: Filters;
  facets: Facets;
  onChange: (next: Filters) => void;
  onReset: () => void;
  isLoading?: boolean;
}

/**
 * SearchFilters
 *
 * - Controlled by `filters` prop (derived from URL in page).
 * - Emits changes through `onChange`.
 * - Debounces keyword (`q`) input by 300ms.
 *
 * Uses native multi-selects for simplicity and accessibility.
 */
export default function SearchFilters({
  filters,
  facets,
  onChange,
  onReset,
  isLoading = false,
}: Props) {
  const [q, setQ] = useState(filters.q ?? "");

  useEffect(() => {
    // Keep local q in sync when filters change externally (e.g. back/forward)
    setQ(filters.q ?? "");
  }, [filters.q]);

  // Debounce keyword updates by 300ms
  useEffect(() => {
    const id = setTimeout(() => {
      if ((filters.q ?? "") !== (q ?? "")) {
        onChange({ ...filters, q: q ?? "" });
      }
    }, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  function handleMultiSelectChange(
    e: React.ChangeEvent<HTMLSelectElement>,
    key: "city" | "degree" | "specialties"
  ) {
    const values = Array.from(e.target.selectedOptions).map((o) => o.value);
    onChange({ ...filters, [key]: values });
  }

  function handleYoEChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    onChange({ ...filters, yoeRange: val || undefined });
  }

  return (
    <div className="flex flex-col gap-4 items-start lg:items-center">
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Keyword
        </label>
        <input
          aria-label="Keyword search"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or free-text"
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City
        </label>
        <select
          multiple
          aria-label="City"
          value={filters.city ?? []}
          onChange={(e) => handleMultiSelectChange(e, "city")}
          className="w-full h-28 px-2 py-1 border rounded"
        >
          {facets.cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Degree
        </label>
        <select
          multiple
          aria-label="Degree"
          value={filters.degree ?? []}
          onChange={(e) => handleMultiSelectChange(e, "degree")}
          className="w-full h-28 px-2 py-1 border rounded"
        >
          {facets.degrees.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="specialties"
        >
          Specialties
        </label>
        <select
          multiple
          aria-label="Specialties"
          name="specialties"
          value={filters.specialties ?? []}
          onChange={(e) => handleMultiSelectChange(e, "specialties")}
          className="w-full h-28 px-2 py-1 border rounded"
        >
          {facets.specialties.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="yoeRange"
        >
          Years
        </label>
        <select
          aria-label="Years of experience range"
          name="yoeRange"
          value={filters.yoeRange ?? ""}
          onChange={handleYoEChange}
          className="w-full px-2 py-2 border rounded"
        >
          <option value="">Any</option>
          <option value="0-2">0-2</option>
          <option value="3-5">3-5</option>
          <option value="6-10">6-10</option>
          <option value="10-plus">10+</option>
        </select>
      </div>

      <div className="flex gap-2 mt-2 lg:mt-0">
        {isLoading && (
          <div className="px-4 py-2 text-sm text-gray-600">Loading…</div>
        )}
      </div>
    </div>
  );
}
