import { z } from "zod";

export const LocationSuggestSchema = z.object({
  slug_id: z.string(),
  city: z.string(),
  state_code: z.string(),
  geo_id: z.string().optional(),
});

export const LocationSuggestResponseSchema = z.object({
  data: z.array(LocationSuggestSchema),
});

export type TLocationSuggest = z.infer<typeof LocationSuggestSchema>;
export type TLocationSuggestResponse = z.infer<
  typeof LocationSuggestResponseSchema
>;
