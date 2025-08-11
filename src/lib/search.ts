import type { Advocate } from "../types/advocate";

/**
 * Returns true if the advocate matches the provided search term.
 */
export function matchesSearch(advocate: Advocate, term: string): boolean {
  const normalized = term.trim().toLowerCase();
  if (!normalized) return true;

  const stringIncludes = (val?: unknown) =>
    val !== undefined &&
    val !== null &&
    String(val).toLowerCase().includes(normalized);

  // Check simple string fields
  if (stringIncludes(advocate.firstName)) return true;
  if (stringIncludes(advocate.lastName)) return true;
  if (stringIncludes(advocate.city)) return true;
  if (stringIncludes(advocate.degree)) return true;

  // Check specialties array
  if (Array.isArray(advocate.specialties)) {
    for (const s of advocate.specialties) {
      if (stringIncludes(s)) return true;
    }
  }

  // Check numeric fields by converting to string
  if (
    typeof advocate.yearsOfExperience === "number" &&
    stringIncludes(advocate.yearsOfExperience)
  )
    return true;

  if (
    typeof advocate.phoneNumber === "number" &&
    stringIncludes(advocate.phoneNumber)
  )
    return true;

  return false;
}
