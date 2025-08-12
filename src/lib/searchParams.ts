export type Filters = {
  q?: string;
  city?: string[];
  degree?: string[];
  specialties?: string[];
  yoeRange?: string;
};

export function parseFiltersFromSearch(search: string): Filters {
  const params = new URLSearchParams(search);
  const q = params.get("q") ?? undefined;
  const city = params.getAll("city");
  const degree = params.getAll("degree");
  const specialties = params.getAll("specialties");
  const yoeRange = params.get("yoeRange") ?? undefined;

  const result: Filters = {};
  if (q) result.q = q;
  if (city.length > 0) result.city = city;
  if (degree.length > 0) result.degree = degree;
  if (specialties.length > 0) result.specialties = specialties;
  if (yoeRange) result.yoeRange = yoeRange;
  return result;
}

export function buildSearchFromFilters(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.city && filters.city.length > 0) {
    for (const c of filters.city) params.append("city", c);
  }
  if (filters.degree && filters.degree.length > 0) {
    for (const d of filters.degree) params.append("degree", d);
  }
  if (filters.specialties && filters.specialties.length > 0) {
    for (const s of filters.specialties) params.append("specialties", s);
  }
  if (filters.yoeRange) params.set("yoeRange", filters.yoeRange);
  return params.toString();
}
