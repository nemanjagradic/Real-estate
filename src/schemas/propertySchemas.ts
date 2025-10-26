import { z } from "zod";

export const PropertySummarySchema = z.object({
  id: z.number(),
  coverPhoto: z.object({
    url: z.string(),
  }),
  price: z.number(),
  rentFrequency: z.string().nullable().optional(),
  rooms: z.number(),
  title: z.string(),
  baths: z.number(),
  area: z.number(),
  agency: z.object({
    logo: z.object({
      url: z.string(),
    }),
  }),
  isVerified: z.boolean(),
  externalID: z.string(),
  purpose: z.string(),
});

export const PropertyDetailsSchema = PropertySummarySchema.extend({
  description: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  furnishingStatus: z.string().nullable().optional(),
  amenities: z
    .array(z.object({ text: z.string() }))
    .nullable()
    .optional(),

  photos: z
    .array(
      z.object({
        id: z.number(),
        url: z.string(),
        orderIndex: z.number().nullable().optional(),
      })
    )
    .nullable()
    .optional(),
});

export const PropertySummaryResponseSchema = z.object({
  hits: z.array(PropertySummarySchema),
});
export const PropertyDetailsResponseSchema = PropertyDetailsSchema;
