import { z } from "zod";

const AutoCompleteLocationSchema = z.object({
  id: z.number(),
  name: z.string(),
  externalID: z.string(),
});

export const AutoCompleteLocationResponseSchema = z.object({
  hits: z.array(AutoCompleteLocationSchema),
});

export type TAutoCompleteLocation = z.infer<typeof AutoCompleteLocationSchema>;

export type TAutoCompleteLocationResponseSchema = z.infer<
  typeof AutoCompleteLocationResponseSchema
>;
