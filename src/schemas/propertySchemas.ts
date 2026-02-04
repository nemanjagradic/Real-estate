import { z } from "zod";

const PropertySummaryDescriptionSchema = z.object({
  beds: z.number().nullable(),
  beds_min: z.number().nullable().optional(),
  baths: z.number().nullable(),
  baths_min: z.number().nullable().optional(),
  sqft: z.number().nullable(),
  sqft_min: z.number().nullable().optional(),
  lot_sqft: z.number().nullable().optional(),
});

export const PropertySummarySchema = z.object({
  property_id: z.string(),
  primary_photo: z.object({ href: z.string() }),
  list_price: z.number().nullable().optional(),
  list_price_min: z.number().nullable().optional(),
  description: PropertySummaryDescriptionSchema.optional(),
  location: z.object({
    address: z.object({
      line: z.string(),
    }),
  }),
  branding: z
    .array(
      z.object({
        __typename: z.string().optional(),
        name: z.string().nullable(),
        photo: z.string().nullable(),
        type: z.string(),
      }),
    )
    .optional(),
  source: z
    .object({
      type: z.string().optional(),
      agents: z
        .array(
          z.object({
            office_name: z.string().nullable().optional(),
          }),
        )
        .optional()
        .nullable(),
    })
    .optional(),
  advertisers: z
    .array(
      z.object({
        type: z.string(),
      }),
    )
    .optional(),
  status: z.string(),
});

export const PropertyDetailsSchema = PropertySummarySchema.extend({
  description: PropertySummaryDescriptionSchema.extend({
    text: z.string(),
    type: z.string(),
  }),
  tags: z.array(z.string()).optional(),
  photos: z.array(
    z.object({
      href: z.string(),
    }),
  ),
  details: z.array(
    z.object({
      parent_category: z.string(),
      category: z.string(),
      text: z.array(z.string()).nullable().optional(),
    }),
  ),
});

export const PropertySummaryResponseSchema = z.object({
  data: z.object({
    home_search: z
      .object({
        results: z.array(PropertySummarySchema).optional(),
        total: z.number(),
      })
      .nullable(),
  }),
});

export const PropertyDetailsResponseSchema = z.object({
  data: PropertyDetailsSchema.optional(),
});
