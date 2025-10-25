import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { fetchApi, baseUrl } from "../utils/fetchApi";
import { Box, Flex, Spacer, Text, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import ImageScrollBar from "../components/ImageScrollBar";
import {
  PropertyDetailsResponseSchema,
  TPropertyDetails,
} from "../utils/fetchApi";

const PropertyPage = () => {
  const currentProperty = useLoaderData();
  const {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  } = currentProperty as TPropertyDetails;

  return (
    <Box maxWidth={[380, 500, 700, 1000]} margin="auto" p="4" mt="80px">
      {photos && <ImageScrollBar items={photos} />}
      <Box w="full" p="6">
        <Flex pt={4} align="center">
          <Box pr={3} color="green.400">
            {isVerified && <GoVerified />}
          </Box>
          <Text fontWeight="bold" fontSize="lg">
            AED {millify(price)}
            {rentFrequency && `/${rentFrequency}`}
          </Text>
          <Spacer />
          <Avatar size="sm" src={agency?.logo?.url}></Avatar>
        </Flex>
        <Flex
          align="center"
          p="1"
          justify="space-between"
          w={250}
          color="blue.400"
        >
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft
          <BsGridFill />
        </Flex>
        <Box mt={4}></Box>
        <Text fontSize="lg" mb={2} fontWeight="bold">
          {title}
        </Text>
        <Text lineHeight="2" color="gray.600">
          {description}
        </Text>
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
            <Text fontWeight="bold">{type}</Text>
          </Flex>
          <Flex
            justify="space-between"
            w="450px"
            borderBottom="1px"
            borderColor="gray.100"
            padding={3}
          >
            <Text>Purpose</Text>
            <Text fontWeight="bold">{purpose}</Text>
          </Flex>
          {furnishingStatus && (
            <Flex
              justify="space-between"
              w="450px"
              borderBottom="1px"
              borderColor="gray.100"
              padding={3}
            >
              <Text>Furnishing Status</Text>
              <Text fontWeight="bold">{furnishingStatus}</Text>
            </Flex>
          )}
        </Flex>
        <Box>
          {Array.isArray(amenities) && amenities.length > 0 && (
            <Text fontSize="2xl" fontWeight="black" mt="3" mb="1">
              Amenities
            </Text>
          )}
          <Flex flexWrap="wrap">
            {Array.isArray(amenities) &&
              amenities.map((amenity) => (
                <Text
                  fontWeight="bold"
                  color="blue.400"
                  fontSize="l"
                  p="2"
                  bg="gray.200"
                  m="1"
                  borderRadius="5"
                  key={amenity.text}
                >
                  {amenity.text}
                </Text>
              ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyPage;

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const currentProperty = await fetchApi(
    `${baseUrl}/properties/detail?externalID=${id}`,
    PropertyDetailsResponseSchema
  );

  return currentProperty;
};
