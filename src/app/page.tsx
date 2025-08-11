"use client";

import { useEffect, useState, useMemo } from "react";
import type { Advocate } from "../types/advocate";
import { matchesSearch } from "../lib/search";
import { formatPhoneNumber } from "@/lib/displayString";
import SearchBar from "@/app/components/SearchBar";
import { debounce } from "@/lib/debound";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);

    fetch("/api/advocates")
      .then((response) => response.json())
      .then((jsonResponse) => {
        const data = (jsonResponse.data || []) as Advocate[];
        setAdvocates(data);
        setFilteredAdvocates(data);
      })
      .catch((err) => {
        console.error("failed to fetch advocates", err);
      });

    setLoading(false);
  }, []);

  const debouncedFilter = useMemo(
    () =>
      debounce((term: string) => {
        const filtered = advocates.filter((advocate) =>
          matchesSearch(advocate, term)
        );
        setFilteredAdvocates(filtered);
      }, 300),
    [advocates]
  );

  useEffect(() => {
    return () => {
      debouncedFilter.cancel();
    };
  }, [debouncedFilter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedFilter(term);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        Solace Advocates
      </h1>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
          <SearchBar
            value={searchTerm}
            onChange={handleInputChange}
            onReset={handleReset}
            isLoading={loading}
          />
        </div>
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
              {filteredAdvocates.map((advocate) => {
                return (
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
                );
              })}
            </tbody>
          </table>

          {loading && (
            <div className="text-center py-6 text-gray-600">Loading...</div>
          )}

          {!loading && advocates.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No advocates found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
