import { Box, Button, Text } from "@chakra-ui/react";
import Property from "./Property";
import PropertySkeleton from "../UI/PropertySkeleton";
import { TPropertySummary } from "../types/propertyTypes";

type Props = {
  properties: TPropertySummary[];
  isLoading: boolean;
  isFetching: boolean;
  onRetry: () => void;
  limit?: number;
};

const PropertySection = ({
  properties,
  isLoading,
  isFetching,
  onRetry,
  limit = 6,
}: Props) => {
  if (isLoading || isFetching) {
    return (
      <>
        {Array.from({ length: limit }).map((_, i) => (
          <PropertySkeleton key={i} />
        ))}
      </>
    );
  }

  if (properties.length > 0) {
    return (
      <>
        {properties.slice(0, limit).map((property) => (
          <Property key={property.property_id} property={property} />
        ))}
      </>
    );
  }

  return (
    <Box textAlign="center" width="100%" py={10}>
      <Text fontSize="xl" color="red.500" fontWeight="bold">
        Properties exist but are temporarily unavailable.
      </Text>
      <Text fontSize="md" color="gray.500">
        This can happen due to API issues. Please refresh to try again.
      </Text>
      <Button mt={4} onClick={onRetry}>
        Refresh
      </Button>
    </Box>
  );
};

export default PropertySection;
