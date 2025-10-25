export const searchParamKeys = [
  "purpose",
  "locationExternalIDs",
  "categoryExternalID",
  "bathsMin",
  "rentFrequency",
  "minPrice",
  "maxPrice",
  "roomsMin",
  "sort",
  "areaMax",
  "hasPanorama",
  "hasFloorPlan",
] as const;

export type SearchParamsType = Partial<
  Record<(typeof searchParamKeys)[number], string>
>;

export const parseSearchParams = (
  params: URLSearchParams
): SearchParamsType => ({
  purpose: params.get("purpose") || "for-rent",
  locationExternalIDs: params.get("locationExternalIDs") || "5002",
  categoryExternalID: params.get("categoryExternalID") || "4",
  bathsMin: params.get("bathsMin") || "0",
  rentFrequency: params.get("rentFrequency") || "yearly",
  minPrice: params.get("minPrice") || "0",
  maxPrice: params.get("maxPrice") || "1000000",
  roomsMin: params.get("roomsMin") || "0",
  sort: params.get("sort") || "price-desc",
  areaMax: params.get("areaMax") || "35000",
  hasPanorama: params.get("hasPanorama") || "false",
  hasFloorPlan: params.get("hasFloorPlan") || "false",
});
