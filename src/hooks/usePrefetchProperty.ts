import { useQueryClient } from "@tanstack/react-query";
import { fetchApi, baseUrl } from "../utils/fetchApi";
import { PropertyDetailsResponseSchema } from "../schemas/propertySchemas";
import { useRef } from "react";

export const usePrefetchProperty = () => {
  const queryClient = useQueryClient();
  const hoverTimeout = useRef<number | null>(null);

  const handleMouseEnter = (externalID: string) => {
    hoverTimeout.current = window.setTimeout(() => {
      queryClient.prefetchQuery({
        queryKey: ["propertyDetails", externalID],
        queryFn: () =>
          fetchApi(
            `${baseUrl}/properties/detail?externalID=${externalID}`,
            PropertyDetailsResponseSchema
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
