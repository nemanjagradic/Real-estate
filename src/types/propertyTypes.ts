import { z } from "zod";
import {
  PropertyDetailsSchema,
  PropertySummarySchema,
  PropertyDetailsResponseSchema,
} from "../schemas/propertySchemas";

export type TPropertySummary = z.infer<typeof PropertySummarySchema>;
export type TPropertyDetails = z.infer<typeof PropertyDetailsSchema>;

export type TPropertySummaryResponse = {
  hits: TPropertySummary[];
  nbPages?: number;
};

export type TPropertyDetailsResponse = z.infer<
  typeof PropertyDetailsResponseSchema
>;
