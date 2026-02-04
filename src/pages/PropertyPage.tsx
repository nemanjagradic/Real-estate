import { fetchApi, baseUrl } from "../utils/fetchApi";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import ImageScrollBar from "../components/ImageScrollBar";
import { PropertyDetailsResponseSchema } from "../schemas/propertySchemas";
import {
  TPropertyDetails,
  TPropertyDetailsResponse,
} from "../types/propertyTypes";
import { useQuery } from "@tanstack/react-query";
import PropertyDetailsSkeleton from "../UI/PropertyDetailsSkeleton";
import { useParams } from "react-router-dom";
import { getIsVerified } from "../utils/propertyMapper";
import PageError from "../components/PropertyPageError";
import { displaySqft } from "../utils/displaySqft";

const PropertyPage = () => {
  const { id: property_id } = useParams<{ id: string }>();

  const { data, isLoading, isFetching, isError, refetch, error } =
    useQuery<TPropertyDetailsResponse>({
      queryKey: ["propertyDetails", property_id],
      queryFn: async () => {
        return await fetchApi(
          `${baseUrl}/v3/property-detail?property_id=${property_id}`,
          PropertyDetailsResponseSchema,
        );
      },
    });

  if (isLoading || isFetching) {
    return <PropertyDetailsSkeleton />;
  }
  if (isError && error?.message === "REQUEST_TIMEOUT") {
    return (
      <PageError
        title="Request timed out"
        description="The request took too long to complete. This may be due to a slow connection or temporary data provider issue. Try again."
        actionLabel="Try again"
        onAction={refetch}
      />
    );
  }

  if (isError) {
    return (
      <PageError
        title="Unable to load property"
        description="We couldn’t load this property. It might be a temporary issue with data provider. Please try again."
        actionLabel="Try again"
        onAction={refetch}
      />
    );
  }
  if (!data?.data) {
    return (
      <PageError
        title="Property temporarily unavailable"
        description="This property couldn’t be loaded due to a temporary issue with data provider. Please try again."
        onAction={refetch}
      />
    );
  }

  const propertyDetails = data?.data as TPropertyDetails;

  const { list_price, description, status, tags, photos, location, details } =
    propertyDetails;

  const line = location?.address?.line;
  const beds = description?.beds || description?.beds_min || "N/A";
  const baths = description?.baths || description?.baths_min || "N/A";
  const sqft =
    description?.sqft || description?.sqft_min || description?.lot_sqft;
  const isVerified = getIsVerified(propertyDetails);

  const imageItems =
    photos?.map((photo, index) => ({
      id: index,
      url: photo.href,
    })) ?? [];

  const importantCategories = [
    "Interior",
    "Exterior",
    "Community",
    "Listing",
    "Features",
  ];

  const groupedImportantDetails: Record<
    string,
    { category: string; text: string[] }[]
  > = {};
  if (details && details.length > 0) {
    details.forEach((item) => {
      if (!importantCategories.includes(item.parent_category)) return;

      if (!groupedImportantDetails[item.parent_category])
        groupedImportantDetails[item.parent_category] = [];
      groupedImportantDetails[item.parent_category].push({
        category: item.category,
        text: item.text ?? [],
      });
    });
  }

  return (
    <Box maxWidth={[380, 500, 700, 1000]} margin="auto" p="4" mt="80px">
      {imageItems.length > 0 && <ImageScrollBar items={imageItems} />}
      <Box w="full" p="6">
        <Flex pt={4} align="center">
          <Box pr={3} color="green.400">
            {isVerified && <GoVerified />}
          </Box>
          <Text fontWeight="bold" fontSize="lg">
            {list_price
              ? `AED ${millify(list_price as number)}`
              : "Price on request"}
          </Text>
        </Flex>
        <Flex
          align="center"
          p="1"
          justify="space-between"
          w={250}
          color="blue.400"
        >
          {beds} <FaBed /> | {baths} <FaBath /> | {sqft && millify(sqft)}{" "}
          {description && displaySqft(description)}
          <BsGridFill />
        </Flex>
        <Box mt={4}></Box>
        <Text fontSize="lg" mb={2} fontWeight="bold">
          {line}
        </Text>
        <Text
          lineHeight="2"
          color="gray.600"
          dangerouslySetInnerHTML={{ __html: description?.text as string }}
        ></Text>
        <Flex
          flexWrap="wrap"
          textTransform="uppercase"
          justify="space-between"
          my="3"
        >
          <Flex
            justify="space-between"
            w="450px"
            borderBottom="1px"
            borderColor="gray.100"
            padding={3}
          >
            <Text>Type</Text>
            <Text fontWeight="bold">{description?.type}</Text>
          </Flex>
          <Flex
            justify="space-between"
            w="450px"
            borderBottom="1px"
            borderColor="gray.100"
            padding={3}
          >
            <Text>status</Text>
            <Text fontWeight="bold">{status}</Text>
          </Flex>
        </Flex>
        {Object.keys(groupedImportantDetails).length > 0 && (
          <Box mt={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              Property Details
            </Text>

            {Object.entries(groupedImportantDetails).map(
              ([parentCategory, items]) => (
                <Flex
                  key={parentCategory}
                  direction="column"
                  mb={6}
                  flexWrap="wrap"
                >
                  <Text fontSize="xl" fontWeight="semibold" mb={2}>
                    {parentCategory}
                  </Text>

                  {items.map((item) => (
                    <Flex
                      key={item.category}
                      direction="column"
                      mb={3}
                      p={2}
                      borderBottom="1px"
                      borderColor="gray.100"
                      maxW="100%"
                    >
                      <Text fontWeight="bold" mb={1}>
                        {item.category}
                      </Text>
                      <Flex wrap="wrap">
                        {item.text.slice(0, 5).map((line, idx) => (
                          <Text key={idx} pr={4} color="gray.600" fontSize="sm">
                            {line}
                          </Text>
                        ))}
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              ),
            )}
          </Box>
        )}
        <Box>
          {Array.isArray(tags) && tags.length > 0 && (
            <Text fontSize="2xl" fontWeight="black" mt="3" mb="1">
              tags
            </Text>
          )}
          <Flex flexWrap="wrap">
            {Array.isArray(tags) &&
              tags.map((tag) => (
                <Text
                  fontWeight="bold"
                  color="blue.400"
                  fontSize="l"
                  p="2"
                  bg="gray.200"
                  m="1"
                  borderRadius="5"
                  key={tag}
                >
                  {tag}
                </Text>
              ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyPage;
