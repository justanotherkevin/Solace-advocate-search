import { advocateData } from "../../../../db/seed/advocates";

/**
 * GET /api/advocates/search
 *
 * Returns distinct lists of cities, degrees, and specialties computed
 * from the full dataset (not filtered by query).
 */
export async function GET() {
  const data = advocateData;

  const citySet = new Set<string>();
  const degreeSet = new Set<string>();
  const specialtySet = new Set<string>();

  for (const a of data) {
    if (a.city) citySet.add(a.city);
    if (a.degree) degreeSet.add(a.degree);
    if (Array.isArray(a.specialties)) {
      for (const s of a.specialties) {
        if (s) specialtySet.add(s);
      }
    }
  }

  const cities = Array.from(citySet).sort((x, y) =>
    x.localeCompare(y, undefined, { sensitivity: "base" })
  );
  const degrees = Array.from(degreeSet).sort((x, y) =>
    x.localeCompare(y, undefined, { sensitivity: "base" })
  );
  const specialties = Array.from(specialtySet).sort((x, y) =>
    x.localeCompare(y, undefined, { sensitivity: "base" })
  );

  return Response.json({ cities, degrees, specialties });
}
