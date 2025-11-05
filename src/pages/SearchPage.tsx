import { useState } from "react";
import { Flex, Box, Text, Icon, Spinner } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "../components/SearchFilters";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import Property from "../components/Property";
import noResults from "../svg/noresult.svg";
import { fetchApi, baseUrl } from "../utils/fetchApi";
import { useQuery } from "@tanstack/react-query";
import { PropertySummaryResponseSchema } from "../schemas/propertySchemas";
import { TPropertySummaryResponse } from "../types/propertyTypes";
import { parseSearchParams } from "../utils/parseSearchParams";
import PropertySkeleton from "../UI/PropertySkeleton";

const SearchPage = () => {
  const [searchFilters, setSearchFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(Number(searchParams.get("page")) || 1);

  const paginate = (pageNumber: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActive(pageNumber);
    searchParams.set("page", pageNumber.toString());
    setSearchParams(searchParams);
  };

  const { data, isLoading, isFetching } = useQuery<TPropertySummaryResponse>({
    queryKey: ["properties", searchParams.toString()],
    staleTime: 1000 * 60 * 10,
    queryFn: async () => {
      const {
        purpose,
        locationExternalIDs,
        categoryExternalID,
        bathsMin,
        rentFrequency,
        minPrice,
        maxPrice,
        roomsMin,
        sort,
        areaMax,
        hasPanorama,
        hasFloorPlan,
        page,
      } = parseSearchParams(searchParams);

      return fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}&hasFloorPlan=${hasFloorPlan}&hasPanorama=${hasPanorama}&page=${page}`,
        PropertySummaryResponseSchema
      );
    },
    placeholderData: (previousData) => previousData,
  });

  const properties = data?.hits ?? [];
  const totalPages = data?.nbPages ?? 0;

  return (
    <Box mt="60px">
      <Flex
        width="100%"
        cursor="pointer"
        bg={searchFilters ? "darkerBeige" : "beige"}
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text>Search Property By Filters</Text>
        <Icon pl={2} width={7} as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters setActive={setActive} />}
      <Box
        margin="0 auto"
        width={{ base: "90%", sm: "85%", lg: "850px", xl: "1200px" }}
        maxW="1200px"
      >
        <Text
          margin={{ sm: "0", lg: "0 auto" }}
          fontSize="2xl"
          p="4"
          pl="2"
          fontWeight="bold"
          width={{ base: "300px", sm: "85%", lg: "850px", xl: "1200px" }}
        >
          Properties {searchParams.get("purpose")}
        </Text>
        <Box position="relative" mb={4}>
          {isFetching && !isLoading && (
            <Flex justify="center" align="center" mb={4}>
              <Spinner size="sm" color="blue.500" />
              <Text ml={2} fontSize="sm" color="gray.500">
                Loading new properties...
              </Text>
            </Flex>
          )}

          <Flex
            flexWrap="wrap"
            justifyContent={{
              base: "center",
              sm: "center",
              md: "center",
              lg: "space-between",
              xl: "space-between",
            }}
          >
            {isLoading
              ? Array.from({ length: 24 }).map((_, i) => (
                  <PropertySkeleton key={i} />
                ))
              : data?.hits.map((property) => (
                  <Property property={property} key={property.id} />
                ))}
          </Flex>
        </Box>
      </Box>
      {properties.length > 0 && totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          paginate={paginate}
          active={active}
        />
      )}
      {data?.hits?.length === 0 && !isLoading && (
        <Flex
          justify="center"
          align="center"
          flexDirection="column"
          mt={5}
          mb={5}
        >
          <img src={noResults} alt="" />
          <Text fontSize="2xl" mt={3}>
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default SearchPage;
