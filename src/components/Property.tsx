import { Link } from "react-router-dom";
import { Box, Flex, Text, Spacer, Avatar, Image } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { TPropertySummary } from "../types/propertyTypes";
import millify from "millify";
import { usePrefetchProperty } from "../hooks/usePrefetchProperty";

type PropertyProps = {
  property: TPropertySummary;
};

const Property = ({ property }: PropertyProps) => {
  const { handleMouseEnter, handleMouseLeave } = usePrefetchProperty();

  const {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  } = property;

  const capitalizedTitle = title?.split(" ").map((word) => {
    return word[0]?.toUpperCase() + word.slice(1).toLowerCase();
  });
  const formattedTitle =
    title.length > 30
      ? `${capitalizedTitle.join(" ").substring(0, 30)}...`
      : capitalizedTitle.join(" ");
  return (
    <Flex
      flexWrap="wrap"
      w={{ md: "340px", lg: "385px" }}
      px="2"
      pt="0"
      pb="8"
      cursor="pointer"
    >
      <Link
        to={`/property/${externalID}`}
        onMouseEnter={() => handleMouseEnter(externalID)}
        onMouseLeave={handleMouseLeave}
      >
        <Box w="100%">
          <Image
            w="100%"
            h="285px"
            src={coverPhoto ? coverPhoto.url : "./images/house.jpg"}
            alt="house"
          />
        </Box>
        <Box w="full">
          <Flex pt={2} align="center" justify="space-between">
            <Box pr={3} color="green.400">
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              AED {millify(price)}
              {rentFrequency && `/${rentFrequency}`}
            </Text>
            <Spacer />
            <Avatar size="sm" src={agency?.logo?.url} />
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
          <Text fontSize="lg">{formattedTitle}</Text>
        </Box>
      </Link>
    </Flex>
  );
};

export default Property;
