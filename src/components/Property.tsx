import { Link } from "react-router-dom";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
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
    property_id,
    primary_photo,
    list_price,
    list_price_min,
    description,
    isVerified,
  } = property;

  const line = property.location?.address?.line;
  const beds = description?.beds || description?.beds_min || "N/A";
  const baths = description?.baths || description?.baths_min || "N/A";
  const sqft =
    description?.sqft || description?.sqft_min || description?.lot_sqft;
  const price = list_price || list_price_min;

  const displaySqft = (desc: {
    sqft: number | null;
    sqft_min?: number | null | undefined;
    lot_sqft?: number | null | undefined;
  }): string => {
    if (desc.lot_sqft) {
      return "lot sqft";
    } else if (desc.sqft || desc.sqft_min) {
      return "sqft";
    }
    return "N/A";
  };

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
        style={{ width: "100%" }}
        to={`/property/${property_id}`}
        onMouseEnter={() => handleMouseEnter(property_id)}
        onMouseLeave={handleMouseLeave}
      >
        <Box w="100%">
          <Image
            w="100%"
            h="285px"
            src={primary_photo?.href || "./images/house.jpg"}
            alt="house"
            objectFit="cover"
          />
        </Box>
        <Box w="full">
          <Flex pt={2} align="center">
            <Box pr={3} color="green.400">
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              USD {millify(price as number)}{" "}
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
          <Text fontSize="lg">{line}</Text>
        </Box>
      </Link>
    </Flex>
  );
};

export default Property;
