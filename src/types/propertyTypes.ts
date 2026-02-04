import { z } from "zod";
import {
  PropertyDetailsSchema,
  PropertySummarySchema,
  PropertyDetailsResponseSchema,
  PropertySummaryResponseSchema,
} from "../schemas/propertySchemas";

export type TPropertySummary = z.infer<typeof PropertySummarySchema> & {
  isVerified?: boolean;
};
export type TPropertyDetails = z.infer<typeof PropertyDetailsSchema>;

export type TPropertySummaryResponse = z.infer<
  typeof PropertySummaryResponseSchema
>;

export type TPropertyDetailsResponse = z.infer<
  typeof PropertyDetailsResponseSchema
>;
