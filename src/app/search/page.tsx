"use client";

import React, { useEffect, useState } from "react";
import type { Advocate } from "@/types/advocate";
import { formatPhoneNumber } from "@/lib/displayString";
import ResultsTopBar from "@/app/components/ResultsTopBar";
import FiltersModal from "@/app/components/FiltersModal";
import {
  parseFiltersFromSearch,
  buildSearchFromFilters,
  Filters,
} from "@/lib/searchParams";
import { CITIES, DEGREE, SPECIALTIES } from "@/db/seed/advocates";

type Facets = {
  cities: string[];
  degrees: string[];
  specialties: string[];
};

const facets: Facets = {
  cities: CITIES,
  degrees: DEGREE,
  specialties: SPECIALTIES,
};

export default function SearchPage() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<Filters>(() =>
    typeof window !== "undefined"
      ? parseFiltersFromSearch(window.location.search)
      : {}
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchAdvocates(searchString?: string) {
    setIsLoading(true);
    const url = "/api/advocates" + (searchString ? `?${searchString}` : "");
    try {
      const res = await fetch(url);
      const json = await res.json();
      setAdvocates((json.data || []) as Advocate[]);
    } catch (err) {
      console.error("failed to fetch advocates", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const initialSearch =
      typeof window !== "undefined"
        ? window.location.search.replace(/^\?/, "")
        : "";
    setFilters(parseFiltersFromSearch(initialSearch));
    fetchAdvocates(initialSearch);

    const onBrowserHistoryChange = () => {
      const s = window.location.search.replace(/^\?/, "");
      const parsed = parseFiltersFromSearch(s);
      setFilters(parsed);
      fetchAdvocates(s);
    };

    window.addEventListener("popstate", onBrowserHistoryChange);
    return () => window.removeEventListener("popstate", onBrowserHistoryChange);
  }, []);

  function applyFiltersAndPush(advoSearch: Filters) {
    const search = buildSearchFromFilters(advoSearch);
    const newUrl = search ? `?${search}` : window.location.pathname;
    window.history.pushState({}, "", newUrl);
    setFilters(advoSearch);
    fetchAdvocates(search);
  }

  function handleResetSearch() {
    window.history.pushState({}, "", window.location.pathname);
    const empty: Filters = {};
    setFilters(empty);
    fetchAdvocates("");
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Search results</h1>

      <div className="mb-4">
        <ResultsTopBar
          filters={filters}
          facets={facets}
          onChange={(next) => applyFiltersAndPush(next)}
          onReset={handleResetSearch}
          openFilters={() => setIsModalOpen(true)}
        />
      </div>

      <FiltersModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={(next) => applyFiltersAndPush(next)}
        initialFilters={filters}
        facets={facets}
      />

      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="table-fixed">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  First Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Last Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  City
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Degree
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Specialties
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Years of Experience
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider w-[170px]">
                  Phone Number
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {advocates.map((advocate) => (
                <tr
                  key={`${advocate.firstName}-${advocate.lastName}-${advocate.phoneNumber}`}
                >
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {advocate.firstName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {advocate.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {advocate.city}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {advocate.degree}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {advocate.specialties.map((specialty) => (
                      <span
                        key={`${advocate.firstName}-${specialty}`}
                        className="inline-block bg-blue-100 rounded-full px-3 py-1 text-xs font-semibold text-blue-700 mr-2 mb-1"
                      >
                        {specialty}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {advocate.yearsOfExperience}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {formatPhoneNumber(advocate.phoneNumber)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!isLoading && advocates.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No advocates found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
