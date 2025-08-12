"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { buildSearchFromFilters, Filters } from "@/lib/searchParams";
import { CITIES } from "@/db/seed/advocates";

export default function LandingSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const filters: Filters = {};
    if (q.trim()) filters.q = q.trim();
    if (city) filters.city = [city];

    const search = buildSearchFromFilters(filters);
    const url = search ? `/search?${search}` : "/search";
    router.push(url);
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
      <div className="flex items-center gap-3 bg-white rounded-full shadow px-4 py-2 w-full max-w-3xl">
        <div className="flex-1 min-w-0">
          <label htmlFor="landing-q" className="sr-only">
            Keyword
          </label>
          <input
            id="landing-q"
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, specialty, or free text"
            className="w-full px-3 py-2 bg-transparent focus:outline-none text-sm text-gray-700"
          />
        </div>

        <div className="w-56">
          <label htmlFor="landing-city" className="sr-only">
            City
          </label>
          <select
            id="landing-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border rounded text-sm bg-white"
            aria-label="City"
          >
            <option value="">Anywhere</option>
            {CITIES.map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
