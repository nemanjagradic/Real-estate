import { useState } from "react";
import { Flex, Box, Text, Icon, Spinner, Button } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import SearchFilters from "../components/SearchFilters";
import Pagination from "../components/Pagination";
import Property from "../components/Property";
import PropertySkeleton from "../UI/PropertySkeleton";

import noResults from "../svg/noresult.svg";

import { fetchApi, baseUrl } from "../utils/fetchApi";
import { PropertySummaryResponseSchema } from "../schemas/propertySchemas";
import {
  TPropertySummary,
  TPropertySummaryResponse,
} from "../types/propertyTypes";
import {
  parseRentSearchParams,
  parseSaleSearchParams,
} from "../utils/parseSearchParams";
import { mapProperty } from "../utils/propertyMapper";
import { buildQueryString } from "../utils/buildQueryString";

const SearchPage = () => {
  const [searchFilters, setSearchFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(1);

  const purpose = searchParams.get("purpose") ?? "for-rent";
  const limit = Number(searchParams.get("limit")) || 15;

  const paginate = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const offset = (pageNumber - 1) * limit;

    setActive(pageNumber);

    searchParams.set("offset", offset.toString());
    setSearchParams(searchParams);
  };

  const { data, isLoading, isFetching, refetch } =
    useQuery<TPropertySummaryResponse>({
      queryKey: ["properties", purpose, searchParams.toString()],
      staleTime: 1000 * 60 * 10,
      placeholderData: (previousData) => previousData,
      queryFn: async () => {
        if (purpose === "for-sale") {
          const params = parseSaleSearchParams(searchParams);

          const query = buildQueryString({
            city: params.city,
            state_code: params.state_code,
            sort: params.sort,
            price_min: params.price_min,
            price_max: params.price_max,
            beds_min: params.beds_min,
            baths_min: params.baths_min,
            property_type: params.property_type,
            home_size_min: params.home_size_min,
            limit: params.limit,
            offset: params.offset,
          });

          return fetchApi(
            `${baseUrl}/v3/for-sale?${query}`,
            PropertySummaryResponseSchema,
          );
        }
        const params = parseRentSearchParams(searchParams);
        const query = buildQueryString({
          city: params.city,
          state_code: params.state_code,
          sort: params.sort,
          price_min: params.price_min,
          price_max: params.price_max,
          beds_min: params.beds_min,
          baths_min: params.baths_min,
          property_type: params.property_type,
          home_size_min: params.home_size_min,
          cats_ok: params.cats_ok,
          dogs_ok: params.dogs_ok,
          limit: params.limit,
          offset: params.offset,
        });

        return fetchApi(
          `${baseUrl}/v3/for-rent?${query}`,
          PropertySummaryResponseSchema,
        );
      },
    });

  console.log({ isLoading, isFetching });

  const homeSearch = data?.data?.home_search ?? {
    results: [],
    total: 0,
  };

  const properties = Array.isArray(homeSearch.results)
    ? homeSearch.results.map(mapProperty)
    : [];

  const totalResults = homeSearch.total;
  const totalPages = Math.ceil(totalResults / limit);

  const displayProperties = () => {
    if (isLoading || isFetching) {
      return Array.from({ length: 6 }).map((_, i) => (
        <PropertySkeleton key={i} />
      ));
    }

    if (properties.length > 0) {
      return properties.map((property: TPropertySummary) => (
        <Property property={property} key={property.property_id} />
      ));
    }

    return (
      <Flex
        width="100%"
        minH="300px"
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        py={10}
      >
        <Box mb={6}>
          <img src={noResults} alt="No results" width={260} />
        </Box>

        <Text fontSize="2xl" fontWeight="bold">
          No properties found
        </Text>

        <Text
          fontSize="md"
          color="gray.500"
          mt={2}
          maxW="420px"
          lineHeight="1.6"
        >
          This could be due to very specific filters or temporary data issues.
          Please try refreshing the page or adjusting filters.
        </Text>

        <Button
          mt={6}
          bg="darkerBeige"
          _hover={{ bg: "beige" }}
          onClick={() => refetch()}
        >
          Refresh results
        </Button>
      </Flex>
    );
  };

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
        onClick={() => setSearchFilters((prev) => !prev)}
      >
        <Text>Search Property By Filters</Text>
        <Icon pl={2} width={7} as={BsFilter} />
      </Flex>

      {searchFilters && <SearchFilters setActive={setActive} />}

      <Box margin="0 auto" width={{ base: "90%", lg: "1200px" }} maxW="1200px">
        <Text fontSize="2xl" p="4" fontWeight="bold">
          Properties {purpose}
        </Text>

        {!isLoading && isFetching && (
          <Flex justify="center" align="center" mb={4}>
            <Spinner size="sm" />
            <Text ml={2} fontSize="sm" color="gray.500">
              Loading new properties...
            </Text>
          </Flex>
        )}

        <Flex flexWrap="wrap" justify="space-between">
          {displayProperties()}
        </Flex>
      </Box>

      {properties.length > 0 && totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          paginate={paginate}
          active={active}
        />
      )}
    </Box>
  );
};

export default SearchPage;
