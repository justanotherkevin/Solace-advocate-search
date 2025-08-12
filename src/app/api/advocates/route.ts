import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { matchesSearch } from "../../../lib/search";
import type { Advocate } from "../../../types/advocate";

/**
 * Map yoeRange token to min/max bounds.
 */
const YOE_RANGES: Record<string, { min: number; max: number }> = {
  "0-2": { min: 0, max: 2 },
  "3-5": { min: 3, max: 5 },
  "6-10": { min: 6, max: 10 },
  "10-plus": { min: 10, max: Number.POSITIVE_INFINITY },
};

export async function GET(request: Request) {
  // In the future this can be switched to use the DB:
  // const all = await db.select().from(advocates);
  const all: Advocate[] = advocateData;

  const url = new URL(request.url);
  const params = url.searchParams;

  const q = params.get("q") ?? "";
  const cityParams = params.getAll("city");
  const degreeParams = params.getAll("degree");
  const specialtyParams = params.getAll("specialties");
  const yoeRangeParam = params.get("yoeRange") ?? "";

  // Normalize query values for case-insensitive matching.
  const normalizedCities = cityParams.map((c) => c.toLowerCase());
  const normalizedDegrees = degreeParams.map((d) => d.toLowerCase());
  const normalizedSpecialties = specialtyParams.map((s) => s.toLowerCase());

  // Build filtered result set following AND semantics between categories.
  const filtered = all.filter((advocate) => {
    // Keyword filter (q) - reuse matchesSearch helper after trimming.
    if (q && q.trim() !== "") {
      // matchesSearch lowercases and checks many fields.
      if (!matchesSearch(advocate, q)) return false;
    }

    // City multi-select (OR within param values)
    if (normalizedCities.length > 0) {
      const city = advocate.city ?? "";
      if (!normalizedCities.includes(city.toLowerCase())) return false;
    }

    // Degree multi-select (OR within param values)
    if (normalizedDegrees.length > 0) {
      const degree = advocate.degree ?? "";
      if (!normalizedDegrees.includes(degree.toLowerCase())) return false;
    }

    // Specialties multi-select (OR semantics: at least one specialty matches)
    if (normalizedSpecialties.length > 0) {
      const advSpecs = Array.isArray(advocate.specialties)
        ? advocate.specialties.map((s) => String(s).toLowerCase())
        : [];
      const hasMatch = advSpecs.some((s) => normalizedSpecialties.includes(s));
      if (!hasMatch) return false;
    }

    // Years of experience range
    if (yoeRangeParam) {
      const mapping = YOE_RANGES[yoeRangeParam];
      if (!mapping) {
        // Unknown token => exclude result (strict), alternatively we could ignore.
        return false;
      }
      const yoe = Number(advocate.yearsOfExperience);
      if (Number.isNaN(yoe)) return false;
      if (yoe < mapping.min) return false;
      if (yoe > mapping.max) return false;
    }

    return true;
  });

  return Response.json({ data: filtered });
}
