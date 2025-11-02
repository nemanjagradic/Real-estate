import {
  Box,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import "react-horizontal-scrolling-menu/dist/styles.css";

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  items: {
    id: number;
    url: string;
  }[];
};

export default function ImageModal({
  isOpen,
  onClose,
  selectedImage,
  setSelectedImage,
  currentIndex,
  setCurrentIndex,
  items,
}: ImageModalProps) {
  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setSelectedImage(items[(currentIndex + 1) % items.length].url);
  };

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setSelectedImage(
      items[(currentIndex - 1 + items.length) % items.length].url
    );
  };
  const arrowPadding = useBreakpointValue([2, 2, 3, 3]);
  const closePadding = useBreakpointValue([2, 2, 3, 3]);
  const fontSizeCounter = useBreakpointValue([
    "xs",
    "sm",
    "sm",
    "md",
    "md",
    "md",
  ]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
      <ModalOverlay />
      <ModalContent bg="transparent" boxShadow="none">
        <ModalBody
          p="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Box
            position="absolute"
            top={["10px", "10px", "15px", "20px", "20px", "20px"]}
            right={["10px", "10px", "15px", "20px", "20px", "20px"]}
            cursor="pointer"
            zIndex="20"
            onClick={onClose}
            bg="rgba(0,0,0,0.5)"
            p={closePadding}
            borderRadius="full"
            _hover={{ bg: "rgba(0,0,0,0.7)" }}
          >
            <FaTimes
              color="white"
              size={useBreakpointValue([12, 14, 16, 18, 20, 22])}
            />
          </Box>
          <Box
            position="absolute"
            left={["10px", "10px", "15px", "20px", "20px", "20px"]}
            cursor="pointer"
            zIndex="20"
            onClick={showPrev}
            bg="rgba(0,0,0,0.5)"
            p={arrowPadding}
            borderRadius="full"
            _hover={{ bg: "rgba(0,0,0,0.7)" }}
          >
            <FaArrowLeft
              color="white"
              size={useBreakpointValue([12, 14, 16, 18, 20, 22])}
            />
          </Box>
          {selectedImage && (
            <Box position="relative" w="full">
              <Text
                position="absolute"
                fontSize={fontSizeCounter}
                bg="rgba(0,0,0,0.5)"
                px={["2", "2", "3", "3", "4", "4"]}
                py={["1", "1", "2", "2", "2", "2"]}
                borderRadius="md"
                color="white"
                fontWeight="semibold"
                bottom={["3%", "3%", "4%", "5%", "5%", "5%"]}
                left="50%"
                transform="translateX(-50%)"
              >
                {currentIndex + 1} / {items.length}
              </Text>
              <Image
                src={selectedImage}
                alt="Full view"
                maxH={["60vh", "70vh", "75vh", "80vh", "85vh", "90vh"]}
                borderRadius="lg"
                w="full"
                objectFit="cover"
              />
            </Box>
          )}
          <Box
            position="absolute"
            right={["10px", "10px", "15px", "20px", "20px", "20px"]}
            cursor="pointer"
            zIndex="20"
            onClick={showNext}
            bg="rgba(0,0,0,0.5)"
            p={arrowPadding}
            borderRadius="full"
            _hover={{ bg: "rgba(0,0,0,0.7)" }}
          >
            <FaArrowRight
              color="white"
              size={useBreakpointValue([12, 14, 16, 18, 20, 22])}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
