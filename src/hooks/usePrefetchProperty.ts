import { useQueryClient } from "@tanstack/react-query";
import { fetchApi, baseUrl } from "../utils/fetchApi";
import { PropertyDetailsResponseSchema } from "../schemas/propertySchemas";
import { useRef } from "react";

export const usePrefetchProperty = () => {
  const queryClient = useQueryClient();
  const hoverTimeout = useRef<number | null>(null);

  const handleMouseEnter = (property_id: string) => {
    hoverTimeout.current = window.setTimeout(() => {
      queryClient.prefetchQuery({
        queryKey: ["propertyDetails", property_id],
        queryFn: () =>
          fetchApi(
            `${baseUrl}/v3/property-detail?property_id=${property_id}`,
            PropertyDetailsResponseSchema,
          ),
        staleTime: 1000 * 60 * 10,
      });
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) window.clearTimeout(hoverTimeout.current);
  };

  return { handleMouseEnter, handleMouseLeave };
};
