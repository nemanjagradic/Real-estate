import React, { useContext } from "react";
import { Box, Icon, Flex, Image } from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="3">
      <Box
        width="30px"
        height="30px"
        background="gray.500"
        borderRadius="50%"
        cursor="pointer"
        position="relative"
        onClick={() => scrollPrev()}
        _hover={{ background: "gray.700" }}
      >
        <Icon
          as={FaArrowLeft}
          fontSize="l"
          color="white"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%,-50%)"
        ></Icon>
      </Box>
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginLeft="3">
      <Box
        width="30px"
        height="30px"
        background="gray.500"
        borderRadius="50%"
        cursor="pointer"
        position="relative"
        onClick={() => scrollNext()}
        _hover={{ background: "gray.700" }}
      >
        <Icon
          as={FaArrowRight}
          fontSize="l"
          color="white"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%,-50%)"
        ></Icon>
      </Box>
    </Flex>
  );
};
const ImageScrollBar = ({ items }) => {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      style={{ overflow: "hidden" }}
    >
      {items.map((item) => (
        <Box
          width={[280, 400, 600, 890]}
          itemID={item.id}
          key={item.id}
          overflow="hidden"
          p="1"
        >
          <Image
            src={item.url}
            height={[380, 450, 500, 500]}
            alt="Image Description"
            style={{
              objectFit: "cover",
              width: "100%",
            }}
          />
        </Box>
      ))}
    </ScrollMenu>
  );
};
export default ImageScrollBar;
