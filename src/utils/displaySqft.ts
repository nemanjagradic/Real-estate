export const displaySqft = (desc: {
  sqft: number | null;
  sqft_min?: number | null | undefined;
  lot_sqft?: number | null | undefined;
}): string => {
  if (desc.lot_sqft) {
    return "lot sqft";
  } else if (desc.sqft || desc.sqft_min) {
    return "sqft";
  }
  return "N/A";
};
