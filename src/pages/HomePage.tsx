import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TPropertySummaryResponse } from "../types/propertyTypes";
import { PropertySummaryResponseSchema } from "../schemas/propertySchemas";
import { fetchApi, baseUrl } from "../utils/fetchApi";
import { useQueries } from "@tanstack/react-query";
import { mapProperty } from "../utils/propertyMapper";
import PropertySection from "../components/PropertiesSection";

type BannerProps = {
  imageUrl: string;
  purpose: string;
  title1: string;
  title2: string;
  desc1: string;
  desc2?: string;
  link: string;
  buttonText: string;
};

const Banner = ({
  imageUrl,
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  link,
  buttonText,
}: BannerProps) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m={[2, 10]}>
    <img src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5" width={350}>
      <Text
        fontSize={18}
        color="gray.500"
        fontWeight="medium"
        textTransform="uppercase"
      >
        {purpose}
      </Text>
      <Text fontSize={26} fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text color="gray.700" fontSize={16} pt={5} pb={5} fontWeight="medium">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button
        fontSize={16}
        bg="darkerBeige"
        _hover={{ bg: "beige" }}
        color="black"
      >
        <Link to={link}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

const HomePage = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["properties", "for-sale"],
        staleTime: 1000 * 60 * 10,
        queryFn: (): Promise<TPropertySummaryResponse> =>
          fetchApi(
            `${baseUrl}/v3/for-sale?state_code=NY&city=New%20York&beds_min=1&baths_min=1&home_size_min=750`,
            PropertySummaryResponseSchema,
          ),
      },
      {
        queryKey: ["properties", "for-rent"],
        staleTime: 1000 * 60 * 10,
        queryFn: (): Promise<TPropertySummaryResponse> =>
          fetchApi(
            `${baseUrl}/v3/for-rent?state_code=NY&city=New%20York&beds_min=1&baths_min=1&home_size_min=500`,
            PropertySummaryResponseSchema,
          ),
      },
    ],
  });

  const [saleQuery, rentQuery] = results;

  const rentSearch = rentQuery?.data?.data?.home_search ?? {
    results: [],
    total: 0,
  };
  const rentProperties = Array.isArray(rentSearch.results)
    ? rentSearch.results.map(mapProperty)
    : [];

  const saleSearch = saleQuery?.data?.data?.home_search ?? {
    results: [],
    total: 0,
  };
  const saleProperties = Array.isArray(saleSearch.results)
    ? saleSearch.results.map(mapProperty)
    : [];

  const isLoading = saleQuery.isLoading || rentQuery.isLoading;
  const isRentFetching = rentQuery.isFetching;
  const isSaleFetching = saleQuery.isFetching;

  return (
    <Box mt="80px">
      <Banner
        purpose="Rent a home"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        link="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex justify="center" flexWrap="wrap">
        <PropertySection
          properties={rentProperties}
          isLoading={isLoading}
          isFetching={isRentFetching}
          onRetry={rentQuery.refetch}
        />
      </Flex>

      <Banner
        purpose="Buy a home"
        title1=" Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore from Apartments, land, builder floors, villas and more"
        buttonText="Explore Buying"
        link="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex justify="center" flexWrap="wrap">
        <PropertySection
          properties={saleProperties}
          isLoading={isLoading}
          isFetching={isSaleFetching}
          onRetry={saleQuery.refetch}
        />
      </Flex>
    </Box>
  );
};

export default HomePage;
