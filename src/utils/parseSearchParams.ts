export const saleSearchParamKeys = [
  "city",
  "state_code",
  "property_type",
  "baths_min",
  "beds_min",
  "price_min",
  "price_max",
  "sort",
  "home_size_min",
  "limit",
  "offset",
] as const;

export type SaleSearchParams = Partial<
  Record<(typeof saleSearchParamKeys)[number], string>
>;

export const rentSearchParamKeys = [
  ...saleSearchParamKeys,
  "cats_ok",
  "dogs_ok",
] as const;

export type RentSearchParams = Partial<
  Record<(typeof rentSearchParamKeys)[number], string | boolean>
>;

const getParam = (params: URLSearchParams, key: string) => {
  const value = params.get(key);
  return value && value !== "" ? value : undefined;
};

const getBoolParam = (params: URLSearchParams, key: string) => {
  const value = params.get(key);
  return value === "true" ? true : value === "false" ? false : undefined;
};

export const parseSaleSearchParams = (
  params: URLSearchParams,
): SaleSearchParams => ({
  city: getParam(params, "city") ?? "Detroit",
  state_code: getParam(params, "state_code") ?? "MI",
  property_type: getParam(params, "property_type"),
  beds_min: getParam(params, "beds_min") ?? "1",
  baths_min: getParam(params, "baths_min") ?? "1",
  price_min: getParam(params, "price_min"),
  price_max: getParam(params, "price_max"),
  home_size_min: getParam(params, "home_size_min") ?? "750",
  sort: getParam(params, "sort"),
  limit: getParam(params, "limit") ?? "15",
  offset: getParam(params, "offset") ?? "0",
});

export const parseRentSearchParams = (
  params: URLSearchParams,
): RentSearchParams => ({
  city: getParam(params, "city") ?? "Detroit",
  state_code: getParam(params, "state_code") ?? "MI",
  property_type: getParam(params, "property_type"),
  beds_min: getParam(params, "beds_min") ?? "1",
  baths_min: getParam(params, "baths_min") ?? "1",
  price_min: getParam(params, "price_min"),
  price_max: getParam(params, "price_max"),
  home_size_min: getParam(params, "home_size_min") ?? "500",
  sort: getParam(params, "sort"),
  cats_ok: getBoolParam(params, "cats_ok"),
  dogs_ok: getBoolParam(params, "dogs_ok"),
  limit: getParam(params, "limit") ?? "15",
  offset: getParam(params, "offset") ?? "0",
});

export type GenericSearchParams = SaleSearchParams | RentSearchParams;

export const parseSearchParams = (
  params: URLSearchParams,
): GenericSearchParams => {
  const purpose = params.get("purpose") ?? "for-rent";

  return purpose === "for-sale"
    ? parseSaleSearchParams(params)
    : parseRentSearchParams(params);
};
