import { z } from "zod";

export const baseUrl = "https://bayut.p.rapidapi.com";

const PropertySummary = z.object({
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

const PropertyDetailsSchema = PropertySummary.extend({
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
        url: z.string(),
        orderIndex: z.number().nullable().optional(),
      })
    )
    .nullable()
    .optional(),
});

export type TPropertySummary = z.infer<typeof PropertySummary>;
export type TPropertyDetails = z.infer<typeof PropertyDetailsSchema>;

export const PropertySummaryResponseSchema = z.object({
  hits: z.array(PropertySummary),
});
export const PropertyDetailsResponseSchema = PropertyDetailsSchema;

export type TPropertySummaryResponseSchema = z.infer<
  typeof PropertySummaryResponseSchema
>;
export type TPropertyDetailsResponseSchema = z.infer<
  typeof PropertyDetailsResponseSchema
>;

export const fetchApi = async <T>(
  url: string,
  schema: z.ZodSchema<T>
): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY as string,
        "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      },
    });
    if (!response.ok) {
      throw new Error(`Could not fetch data: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return schema.parse(data);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
