"use client";

import React from "react";
import type { Filters as FiltersType } from "./SearchFilters";

type Facets = {
  cities: string[];
  degrees: string[];
  specialties: string[];
};

interface Props {
  q: string;
  setQ: (v: string) => void;
  filters: FiltersType;
  facets: Facets;
  handleMultiSelectChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: "city" | "degree" | "specialties"
  ) => void;
  handleYoEChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onReset: () => void;
  isLoading?: boolean;
  /**
   * When `vertical` is true the controls are rendered stacked, one per row.
   */
  vertical?: boolean;
}

export default function FiltersContent({
  q,
  setQ,
  filters,
  facets,
  handleMultiSelectChange,
  handleYoEChange,
  onReset,
  isLoading = false,
  vertical = false,
}: Props) {
  const containerClass = vertical
    ? "flex flex-col gap-6"
    : "flex flex-col lg:flex-row gap-4 items-start lg:items-center";
  const colClass = (lgWidth: string) =>
    vertical ? "w-full" : `w-full ${lgWidth}`;

  return (
    <div className={containerClass}>
      {/* Keyword */}
      <div className={colClass("lg:w-4/12")}>
        <label
          htmlFor="filter-keyword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Keyword
        </label>
        <input
          id="filter-keyword"
          aria-label="Keyword search"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or free-text"
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* City (multi-select) */}
      <div className={colClass("lg:w-2/12")}>
        <label
          htmlFor="filter-city"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          City
        </label>
        <select
          id="filter-city"
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

      {/* Degree (multi-select) */}
      <div className={colClass("lg:w-2/12")}>
        <label
          htmlFor="filter-degree"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Degree
        </label>
        <select
          id="filter-degree"
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

      {/* Specialties (multi-select) */}
      <div className={colClass("lg:w-2/12")}>
        <label
          htmlFor="filter-specialties"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Specialties
        </label>
        <select
          id="filter-specialties"
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

      {/* Years of experience */}
      <div className={colClass("lg:w-1/12")}>
        <label
          htmlFor="filter-yoe"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Years
        </label>
        <select
          id="filter-yoe"
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

      {/* Actions */}
      <div className="flex gap-2 mt-2 lg:mt-0">
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 border text-sm rounded bg-white hover:bg-gray-100"
        >
          Reset
        </button>
        {isLoading && (
          <div className="px-4 py-2 text-sm text-gray-600">Loading…</div>
        )}
      </div>
    </div>
  );
}
