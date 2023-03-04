import React, { useState } from "react";
import {
  Box,
  Image,
  IconButton,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Badge,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, ViewIcon } from "@chakra-ui/icons";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

function ImageCarousel({ carImages }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleCircleClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleImageClick = () => {
    onOpen();
  };

  return (
    <Box
      maxW={{ base: "100%", sm: "400px", md: "600px", lg: "800px" }}
      mx="auto"
      ml="-2%"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        position="relative"
        className="carousel"
        marginLeft="2%"
        marginBottom="-1%"
      >
        <IconButton
          aria-label="Previous"
          icon={<BiLeftArrowAlt />}
          onClick={handlePrevClick}
          position="absolute"
          top="50%"
          left="0"
          transform="translateY(-50%)"
          zIndex="1"
          bg="rgba(255, 255, 255, 0.512);"
          color="black"
          border="3px solid black"
          borderRadius="100%"
        />

        <IconButton
          aria-label="Next"
          icon={<BiRightArrowAlt />}
          onClick={handleNextClick}
          position="absolute"
          top="50%"
          right="0"
          transform="translateY(-50%)"
          zIndex="1"
          bg="rgba(255, 255, 255, 0.512);"
          color="black"
          border="3px solid black"
          borderRadius="100%"
        />

        <Image
          src={carImages[currentImageIndex]}
          rounded={"md"}
          fit={"cover"}
          align={"center"}
          w="500px"
          h="350px"
          onClick={handleImageClick}
        />
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg="transparent">
            <Image
              rounded={"md"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", lg: "full" }}
              src={carImages[currentImageIndex]}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
}

export default ImageCarousel;
