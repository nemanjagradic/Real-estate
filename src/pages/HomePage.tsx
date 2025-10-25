import { Box, Button, Flex, Text, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  TPropertySummaryResponseSchema,
  TPropertySummary,
} from "../types/propertyTypes";
import { PropertySummaryResponseSchema } from "../schemas/propertySchemas";
import { fetchApi, baseUrl } from "../utils/fetchApi";
import Property from "../components/Property";
import { useEffect, useState } from "react";

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
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
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
  const [propertyForSale, setPropertyForSale] =
    useState<TPropertySummaryResponseSchema>({
      hits: [],
    });
  const [propertyForRent, setPropertyForRent] =
    useState<TPropertySummaryResponseSchema>({
      hits: [],
    });
  const [loading, setLoading] = useState(false);
  // const { propertyForRent, propertyForSale } = useLoaderData();

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const [propertyForSale, propertyForRent] = await Promise.all([
          fetchApi(
            `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`,
            PropertySummaryResponseSchema
          ),
          fetchApi(
            `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`,
            PropertySummaryResponseSchema
          ),
        ]);

        setPropertyForSale(propertyForSale);
        setPropertyForRent(propertyForRent);
        console.log(propertyForRent);
      } catch (error) {
        console.error("Failed to load properties", error);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

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
      ></Banner>
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
        <Flex justify="center" flexWrap="wrap">
          {propertyForRent.hits.map((property: TPropertySummary) => (
            <Property property={property} key={property.id} />
          ))}
        </Flex>
      )}
      <Banner
        purpose="Buy a home"
        title1=" Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore from Apartments, land, builder floors, villas and more"
        buttonText="Explore Buying"
        link="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
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
        <Flex justify="center" flexWrap="wrap">
          {propertyForSale.hits.map((property: TPropertySummary) => (
            <Property property={property} key={property.id} />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default HomePage;

// export const loader = async ({ params, request }) => {
//   const propertyForSale = await fetchApi(
//     `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
//   );
//   const propertyForRent = await fetchApi(
//     `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
//   );

//   return { propertyForSale, propertyForRent };
// };
