"use client";

import LandingSearch from "@/app/components/LandingSearch";
import { SAMPLE_ADVOICES } from "@/db/seed/advocates";
import { formatPhoneNumber } from "@/lib/displayString";

export default function Home() {
  return (
    <main className="p-6 ">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">
        Solace Advocates
      </h1>

      <div className="mb-8">
        <LandingSearch />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-gray-600 mb-6">
          <p>
            Use the search above to find advocates by keyword and city. Advanced
            filters are available on the results page.
          </p>
        </div>

        <section
          aria-label="Advocate cards"
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  w-full max-w-3xl "
        >
          {SAMPLE_ADVOICES.map((advocate) => (
            <article
              key={`${advocate.firstName}-${advocate.lastName}-${advocate.phoneNumber}`}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex flex-col"
            >
              <header className="mb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900">
                      {advocate.firstName} {advocate.lastName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {advocate.city} •{" "}
                      <span className="font-medium">{advocate.degree}</span>
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">
                    {advocate.yearsOfExperience} yrs
                  </div>
                </div>
              </header>

              <div className="flex-1 mb-4">
                <p className="text-sm text-gray-700 mb-3">Specialties</p>
                <div className="flex flex-wrap">
                  {advocate.specialties.map((s) => (
                    <span
                      key={`${advocate.firstName}-${s}`}
                      className="inline-block bg-blue-50 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2 mb-2"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <footer className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-600">Contact</div>
                  <div className="text-blue-900 font-medium">
                    {formatPhoneNumber(advocate.phoneNumber)}
                  </div>
                </div>
              </footer>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
