import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  TPropertySummary,
  TPropertySummaryResponse,
} from "../types/propertyTypes";
import { PropertySummaryResponseSchema } from "../schemas/propertySchemas";
import { fetchApi, baseUrl } from "../utils/fetchApi";
import Property from "../components/Property";
import PropertySkeleton from "../UI/PropertySkeleton";
import { useQueries } from "@tanstack/react-query";

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
}: BannerProps) => {
  return (
    <Flex
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      m={[2, 10]}
    >
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
};

const HomePage = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["properties", "for-sale"],
        queryFn: (): Promise<TPropertySummaryResponse> =>
          fetchApi(
            `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`,
            PropertySummaryResponseSchema
          ),
      },
      {
        queryKey: ["properties", "for-rent"],
        queryFn: (): Promise<TPropertySummaryResponse> =>
          fetchApi(
            `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`,
            PropertySummaryResponseSchema
          ),
      },
    ],
  });

  const [saleQuery, rentQuery] = results;

  const isLoading = saleQuery.isLoading || rentQuery.isLoading;

  console.log(saleQuery, rentQuery);

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
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <PropertySkeleton key={i} />
            ))
          : rentQuery.data?.hits.map((property: TPropertySummary) => (
              <Property property={property} key={property.id} />
            ))}
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
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <PropertySkeleton key={i} />
            ))
          : saleQuery.data?.hits.map((property: TPropertySummary) => (
              <Property property={property} key={property.id} />
            ))}
      </Flex>
    </Box>
  );
};

export default HomePage;
