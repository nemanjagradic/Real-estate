import { Box, Skeleton, SkeletonText, Flex } from "@chakra-ui/react";

const PropertyDetailsSkeleton = () => (
  <Box maxWidth={[380, 500, 700, 1000]} margin="auto" p="4" mt="80px">
    <Skeleton height="300px" borderRadius="lg" />
    <Box p="6">
      <Flex align="center" justify="space-between" mt={4}>
        <Skeleton height="20px" width="100px" />
        <Skeleton height="30px" width="30px" borderRadius="full" />
      </Flex>
      <SkeletonText mt="4" noOfLines={3} spacing="4" />
      <Flex mt="4" gap={3}>
        <Skeleton height="25px" width="70px" />
        <Skeleton height="25px" width="70px" />
        <Skeleton height="25px" width="70px" />
      </Flex>
      <SkeletonText mt="4" noOfLines={4} spacing="3" />
    </Box>
  </Box>
);

export default PropertyDetailsSkeleton;
