export type SelectFilter = {
  type: "select";
  items: { name: string; value: string }[];
  placeholder: string;
  queryName: string;
  purpose?: "for-sale" | "for-rent";
};

export type CheckboxFilter = {
  type: "checkbox";
  label: string;
  queryName: string;
  purpose?: "for-sale" | "for-rent";
};

export type FilterItem = SelectFilter | CheckboxFilter;

export const filterData: FilterItem[] = [
  {
    type: "select",
    items: [
      { name: "Buy", value: "for-sale" },
      { name: "Rent", value: "for-rent" },
    ],
    placeholder: "Purpose",
    queryName: "purpose",
  },

  {
    type: "select",
    items: [
      { name: "50,000", value: "50000" },
      { name: "100,000", value: "100000" },
      { name: "200,000", value: "200000" },
      { name: "500,000", value: "500000" },
      { name: "1,000,000", value: "1000000" },
    ],
    placeholder: "Min Price",
    queryName: "price_min",
    purpose: "for-sale",
  },
  {
    type: "select",
    items: [
      { name: "1,000", value: "1000" },
      { name: "1,500", value: "1500" },
      { name: "2,000", value: "2000" },
      { name: "2,500", value: "2500" },
      { name: "3,000", value: "3000" },
    ],
    placeholder: "Min Price",
    queryName: "price_min",
    purpose: "for-rent",
  },

  {
    type: "select",
    items: [
      { name: "1,000,000", value: "1000000" },
      { name: "750,000", value: "750000" },
      { name: "500,000", value: "500000" },
    ],
    placeholder: "Max Price",
    queryName: "price_max",
    purpose: "for-sale",
  },
  {
    type: "select",
    items: [
      { name: "3,000", value: "3000" },
      { name: "2,500", value: "2500" },
      { name: "2,000", value: "2000" },
    ],
    placeholder: "Max Price",
    queryName: "price_max",
    purpose: "for-rent",
  },

  {
    type: "select",
    items: [
      { name: "750", value: "750" },
      { name: "1000", value: "1000" },
      { name: "1250", value: "1250" },
      { name: "1500", value: "1500" },
    ],
    placeholder: "Home Size Min",
    queryName: "home_size_min",
    purpose: "for-sale",
  },
  {
    type: "select",
    items: [
      { name: "500", value: "500" },
      { name: "750", value: "750" },
      { name: "1000", value: "1000" },
    ],
    placeholder: "Home Size Min",
    queryName: "home_size_min",
    purpose: "for-rent",
  },

  {
    type: "select",
    items: [
      { name: "Single Family", value: "single_family" },
      { name: "Multi Family", value: "multi_family" },
      { name: "Mobile", value: "mobile" },
      { name: "Land", value: "land" },
      { name: "Farm", value: "farm" },
    ],
    placeholder: "Property Type",
    queryName: "property_type",
    purpose: "for-sale",
  },
  {
    type: "select",
    items: [
      { name: "Apartment", value: "apartment" },
      { name: "Townhome", value: "townhome" },
      { name: "Coop", value: "coop" },
      { name: "Condo", value: "condo" },
      { name: "Condop", value: "condop" },
      { name: "Single Family", value: "single_family" },
    ],
    placeholder: "Property Type",
    queryName: "property_type",
    purpose: "for-rent",
  },

  {
    type: "select",
    items: Array.from({ length: 10 }, (_, i) => ({
      name: `${i + 1}`,
      value: `${i + 1}`,
    })),
    placeholder: "Beds Min",
    queryName: "beds_min",
  },

  {
    type: "select",
    items: Array.from({ length: 10 }, (_, i) => ({
      name: `${i + 1}`,
      value: `${i + 1}`,
    })),
    placeholder: "Baths Min",
    queryName: "baths_min",
  },

  {
    type: "checkbox",
    label: "Cats Friendly",
    queryName: "cats_ok",
    purpose: "for-rent",
  },
  {
    type: "checkbox",
    label: "Dogs Friendly",
    queryName: "dogs_ok",
    purpose: "for-rent",
  },
];
