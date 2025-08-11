"use client";

import React from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  onReset,
  isLoading,
}: Props) {
  return (
    <>
      <div className="flex justify-between">
        <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
          <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
            <div className="flex">
              <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                <svg
                  width="18"
                  height="18"
                  className="w-4 lg:w-auto"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Search icon"
                >
                  <title>Search</title>
                  <path
                    d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                    stroke="#455A64"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.9993 16.9993L13.1328 13.1328"
                    stroke="#455A64"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <input
              type="text"
              value={value}
              onChange={onChange}
              className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
              placeholder="Search by name, city, degree, specialties, or years of experience"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
        >
          Reset Search
        </button>
      </div>
      {isLoading && <span aria-hidden>Loading…</span>}
      {value && (
        <p className="text-sm text-gray-600 mt-2">
          Searching for: "{value}"
          <span id="search-term" className="font-medium"></span>
        </p>
      )}
    </>
  );
}
