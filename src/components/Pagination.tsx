import { Box, Flex, Text } from "@chakra-ui/react";

type PaginationProps = {
  totalPages: number;
  active: number;
  paginate: (page: number) => void;
};

export default function Pagination({
  totalPages,
  active,
  paginate,
}: PaginationProps) {
  const getPages = (): (number | string)[] => {
    if (totalPages <= 0) return [];

    const pages: (number | string)[] = [];

    pages.push(1);

    let start = Math.max(2, active - 2);
    let end = Math.min(totalPages - 1, active + 2);

    if (active <= 4) {
      start = 2;
      end = 5;
    }

    if (active >= totalPages - 3) {
      start = totalPages - 4;
      end = totalPages - 1;
    }

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const visiblePages = getPages();

  return (
    <Flex justify="center" gap={2} my={6} wrap="wrap">
      {visiblePages.map((page, idx) =>
        typeof page === "number" ? (
          <Box
            key={`page_${page}_${idx}`}
            as="button"
            onClick={() => paginate(page as number)}
            px={3}
            py={1}
            borderRadius="md"
            bg={page === active ? "blue.500" : "gray.100"}
            color={page === active ? "white" : "gray.700"}
            fontWeight={page === active ? "bold" : "normal"}
            _hover={{
              bg: page === active ? "blue.600" : "gray.200",
            }}
            transition="background 0.2s"
          >
            {page}
          </Box>
        ) : (
          <Text key={`ellipsis_${idx}`} px={2} fontWeight="bold">
            …
          </Text>
        )
      )}
    </Flex>
  );
}
