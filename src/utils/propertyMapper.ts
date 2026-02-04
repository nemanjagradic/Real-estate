import { TPropertySummary, TPropertyDetails } from "../types/propertyTypes";

type PropertyLike = TPropertySummary | TPropertyDetails;

export const getIsVerified = (p: PropertyLike): boolean => {
  const isForSale = p.status === "for_sale";
  const isForRent = p.status === "for_rent";

  // Coerce optional chaining results to boolean using !! or ?? false
  const isSaleVerified =
    Boolean(p.branding?.length) &&
    !!p.source?.agents?.some((agent) => !!agent.office_name);

  const isRentVerified =
    p.source?.type === "community" ||
    !!p.advertisers?.some(
      (adv) => adv.type === "management" || adv.type === "community",
    );

  return Boolean(
    (isForSale && isSaleVerified) || (isForRent && isRentVerified),
  );
};

export const mapProperty = (p: TPropertySummary) => ({
  ...p,
  isVerified: getIsVerified(p),
});
