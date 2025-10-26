import { useState, useEffect } from "react";
import { Flex, Box, Text, Icon, Spinner } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "../components/SearchFilters";
import { useSearchParams } from "react-router-dom";
import Property from "../components/Property";
import noResults from "../svg/noresult.svg";
import { fetchApi, baseUrl } from "../utils/fetchApi";
import { PropertySummaryResponseSchema } from "../schemas/propertySchemas";
import { TPropertySummaryResponseSchema } from "../types/propertyTypes";
import { parseSearchParams } from "../utils/parseSearchParams";

const SearchPage = () => {
  const [searchFilters, setSearchFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const [properties, setProperties] = useState<TPropertySummaryResponseSchema>({
    hits: [],
  });

  useEffect(() => {
    const fetchProperties = async () => {
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
      } = parseSearchParams(searchParams);
      setLoading(true);
      const data = await fetchApi(
        `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}&hasFloorPlan=${hasFloorPlan}&hasPanorama=${hasPanorama}`,
        PropertySummaryResponseSchema
      );

      setProperties(data);
      setLoading(false);
    };
    fetchProperties();
  }, [searchParams]);

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
      {searchFilters && <SearchFilters />}
      <Box
        margin="0 auto"
        width={{ base: "300px", sm: "85%", lg: "850px", xl: "1200px" }}
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
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            margin="100px auto"
            display="block"
          />
        ) : (
          <Flex
            flexWrap="wrap"
            justifyContent={{
              sm: "center",
              md: "center",
              lg: "space-between",
              xl: "space-between",
            }}
          >
            {properties.hits.map((property) => (
              <Property property={property} key={property.id} />
            ))}
          </Flex>
        )}
      </Box>
      {properties.hits.length === 0 && !loading && (
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
