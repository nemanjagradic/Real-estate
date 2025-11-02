import { useContext, useState } from "react";
import { Box, Image, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";
import ImageModal from "./ImageModal";

type ImageScrollBarProps = {
  items: {
    id: number;
    url: string;
  }[];
};

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
  return (
    <Flex
      w={["30px", "35px", "40px"]}
      h={["30px", "35px", "40px"]}
      bg="gray.500"
      borderRadius="50%"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      _hover={{ bg: "gray.700" }}
      onClick={() => scrollPrev()}
      mt="auto"
      mb="auto"
      mr="1"
      ml="0"
    >
      <Icon
        as={FaArrowLeft}
        w={["14px", "16px", "18px", "20px"]}
        h={["14px", "16px", "18px", "20px"]}
        color="white"
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);
  return (
    <Flex
      w={["30px", "35px", "40px"]}
      h={["30px", "35px", "40px"]}
      bg="gray.500"
      borderRadius="50%"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      _hover={{ bg: "gray.700" }}
      onClick={() => scrollNext()}
      mt="auto"
      mb="auto"
      ml="1"
      mr="0"
    >
      <Icon
        as={FaArrowRight}
        w={["14px", "16px", "18px", "20px"]}
        h={["14px", "16px", "18px", "20px"]}
        color="white"
      />
    </Flex>
  );
};

const ImageScrollBar = ({ items }: ImageScrollBarProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (url: string) => {
    const currentIdx = items.findIndex((photo) => photo.url === url);
    setCurrentIndex(currentIdx);
    setSelectedImage(url);
    onOpen();
  };

  return (
    <>
      <Box overflow="hidden" margin="0 auto">
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {items.map((item) => (
            <Box
              key={item.id}
              itemID={item.id.toString()}
              w={["90vw", "400px", "580px", "880px"]}
              mr="1"
              cursor="pointer"
              overflow="hidden"
              onClick={() => handleImageClick(item.url)}
            >
              <Image
                src={item.url}
                alt="Property"
                objectFit="cover"
                w="100%"
                h={["250px", "320px", "380px", "480px"]}
                style={{ transition: "0.2s ease-in-out" }}
                _hover={{ transform: "scale(1.03)" }}
              />
            </Box>
          ))}
        </ScrollMenu>
        <ImageModal
          isOpen={isOpen}
          onClose={onClose}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          items={items}
        />
      </Box>
    </>
  );
};

export default ImageScrollBar;
