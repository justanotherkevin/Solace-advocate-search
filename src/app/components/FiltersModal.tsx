"use client";

import React, { useEffect, useRef, useState } from "react";
import SearchFilters, { Filters as SearchFiltersType } from "./SearchFilters";

type Facets = {
  cities: string[];
  degrees: string[];
  specialties: string[];
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApply: (next: SearchFiltersType) => void;
  initialFilters: SearchFiltersType;
  facets: Facets;
  isLoading?: boolean;
}

export default function FiltersModal({
  isOpen,
  onClose,
  onApply,
  initialFilters,
  facets,
  isLoading = false,
}: Props) {
  const [localFilters, setLocalFilters] = useState<SearchFiltersType>(
    initialFilters ?? {}
  );
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLocalFilters(initialFilters ?? {});
  }, [initialFilters, isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) {
      onClose();
    }
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-start justify-center"
      aria-hidden={!isOpen}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filter results"
        className="mt-14 w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex  relative p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="absolute right-4 top-3 text-gray-600 rounded-full hover:bg-gray-100 p-1"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="max-h-[70vh] overflow-auto p-6 space-y-6">
          <SearchFilters
            filters={localFilters}
            facets={facets}
            onChange={(next) => setLocalFilters(next)}
            onReset={() => setLocalFilters({})}
            isLoading={isLoading}
          />
        </div>

        {/* Sticky footer */}
        <div className="bg-white border-t p-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setLocalFilters({});
            }}
            className="text-sm text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 bg-gray-100"
          >
            Clear all
          </button>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Showing results</div>
            <button
              type="button"
              onClick={() => {
                onApply(localFilters);
                onClose();
              }}
              className="px-4 py-2 bg-black text-white rounded-md text-sm shadow"
            >
              Show results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
