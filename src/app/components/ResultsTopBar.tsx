"use client";

import React, { useEffect, useState } from "react";
import type { Filters } from "@/lib/searchParams";

type Facets = {
  cities: string[];
  degrees: string[];
  specialties: string[];
};

interface Props {
  filters: Filters;
  facets: Facets;
  onChange: (next: Filters) => void;
  onReset: () => void;
  openFilters: () => void;
  isLoading?: boolean;
}

export default function ResultsTopBar({
  filters,
  facets,
  onChange,
  onReset,
  openFilters,
  isLoading = false,
}: Props) {
  const [q, setQ] = useState(filters.q ?? "");
  const [city, setCity] = useState((filters.city && filters.city[0]) ?? "");

  useEffect(() => {
    setQ(filters.q ?? "");
    setCity((filters.city && filters.city[0]) ?? "");
  }, [filters.q, filters.city]);

  // Debounce q updates (300ms)
  useEffect(() => {
    const id = setTimeout(() => {
      if ((filters.q ?? "") !== (q ?? "")) {
        onChange({ ...filters, q: q ?? "" });
      }
    }, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  function handleCityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    if (val) {
      onChange({ ...filters, city: [val] });
    } else {
      const next = { ...filters };
      delete next.city;
      onChange(next);
    }
  }

  return (
    <div className="flex items-center gap-3 bg-white rounded-md p-3 shadow-sm">
      <div className="flex-1 min-w-0">
        <label htmlFor="results-q" className="sr-only">
          Keyword
        </label>
        <input
          id="results-q"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, specialty, or free-text"
          className="w-full px-3 py-2 border rounded text-sm"
        />
      </div>

      <div className="w-48">
        <label htmlFor="results-city" className="sr-only">
          City
        </label>
        <select
          id="results-city"
          value={city}
          onChange={handleCityChange}
          className="w-full px-3 py-2 border rounded text-sm bg-white"
        >
          <option value="">Anywhere</option>
          {facets.cities.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onReset}
          className="px-3 py-2 border rounded text-sm bg-white hover:bg-gray-50"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={openFilters}
          className="px-3 py-2 bg-white border rounded text-sm hover:bg-gray-50"
          aria-haspopup="dialog"
        >
          Filters
        </button>

        {isLoading && (
          <div className="text-sm text-gray-600 ml-2">Loading…</div>
        )}
      </div>
    </div>
  );
}
