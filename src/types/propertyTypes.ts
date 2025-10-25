import { z } from "zod";
import {
  PropertyDetailsSchema,
  PropertySummarySchema,
  PropertyDetailsResponseSchema,
  PropertySummaryResponseSchema,
} from "../schemas/propertySchemas";

export type TPropertySummary = z.infer<typeof PropertySummarySchema>;
export type TPropertyDetails = z.infer<typeof PropertyDetailsSchema>;

export type TPropertySummaryResponseSchema = z.infer<
  typeof PropertySummaryResponseSchema
>;
export type TPropertyDetailsResponseSchema = z.infer<
  typeof PropertyDetailsResponseSchema
>;
