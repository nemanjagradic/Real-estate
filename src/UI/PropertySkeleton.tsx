import { Box, Skeleton, SkeletonText, Flex } from "@chakra-ui/react";

export default function PropertySkeleton() {
  return (
    <Flex
      flexWrap="wrap"
      w={{ base: "90%", sm: "300px", md: "330px", lg: "385px" }}
      px="2"
      pt="0"
      pb="8"
    >
      <Box w="100%">
        <Skeleton height="285px" mb="4" />
      </Box>
      <Box w="full">
        <SkeletonText mt="4" noOfLines={3} spacing="4" />
      </Box>
    </Flex>
  );
}
