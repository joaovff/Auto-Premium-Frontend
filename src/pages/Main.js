import { Link } from "react-router-dom";
import { getAllAnnouncements, getMakes } from "../api";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  CheckboxGroup,
  Stack,
  Checkbox,
  Card,
  CardBody,
  CardFooter,
  Button,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";

import { DragHandleIcon, SearchIcon } from "@chakra-ui/icons";
function Main() {
  function handleSearch(keyword) {
    const filtered = announcements.filter((announcement) => {
      return announcement.title.toLowerCase().includes(keyword.toLowerCase());
    });
    setFilteredAnnouncements(filtered);
  }
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [announcements, setAnnoucements] = useState([]);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function handleGetAllAnnouncements() {
      const response = await getAllAnnouncements();
      setFilteredAnnouncements(response.data);
      setAnnoucements(response.data);
    }
    handleGetAllAnnouncements();
  }, []);

  return (
    <div>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Stack>
          <CardBody>
            <SearchBar handleSearch={handleSearch} />
            <br />
            <br />
            <Stack direction={{ base: "column", sm: "row" }}>
              Price:
              <NumberInput size="md" maxW={24} min={1}>
                <NumberInputField placeholder="€ Min" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <NumberInput size="md" maxW={24} min={1}>
                <NumberInputField placeholder="€ Max" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Stack>
          </CardBody>

          <CardFooter>
            <CheckboxGroup
              colorScheme="black"
              defaultValue={["naruto", "kakashi"]}
            >
              <Stack spacing={[1, 5]} direction={["column", "row"]}></Stack>
            </CheckboxGroup>
          </CardFooter>
        </Stack>
      </Card>
      <Flex justifyContent="end" mt={4}>
        <Popover placement="bottom" isLazy>
          <PopoverTrigger>
            <IconButton
              aria-label="More server options"
              icon={<DragHandleIcon />}
              variant="solid"
              w="fit-content"
            />
          </PopoverTrigger>
          <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
            <PopoverArrow />
            <PopoverBody>
              <Stack>
                <Button
                  w="194px"
                  variant="ghost"
                  justifyContent="space-between"
                  fontWeight="normal"
                  fontSize="sm"
                >
                  Price
                </Button>
                <Button
                  w="194px"
                  variant="ghost"
                  justifyContent="space-between"
                  fontWeight="normal"
                  fontSize="sm"
                >
                  HP
                </Button>
                <Button
                  w="194px"
                  variant="ghost"
                  justifyContent="space-between"
                  fontWeight="normal"
                  fontSize="sm"
                >
                  KM
                </Button>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      {filteredAnnouncements.map((item) => {
        return (
          <Center key={item._id} py={6}>
            <Box
              w="xs"
              rounded={"sm"}
              my={5}
              mx={[0, 5]}
              overflow={"hidden"}
              bg="white"
              boxShadow={"2xl"}
            >
              <Box h={"200px"}>
                <Img
                  src={item.image}
                  roundedTop={"sm"}
                  objectFit="cover"
                  h="full"
                  w="full"
                  alt={"Blog Image"}
                />
              </Box>
              <Box p={4}>
                <Box
                  bg="black"
                  display={"inline-block"}
                  px={2}
                  py={1}
                  color="white"
                  mb={2}
                >
                  <Text fontSize={"xs"} fontWeight="medium">
                    {item.price.toLocaleString("pt-pt", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    €
                  </Text>
                </Box>
                <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
                  {item.title}
                </Heading>
                <Text color={"gray.500"} noOfLines={2}>
                  {item.kms
                    .toLocaleString("pt-pt", {
                      minimumFractionDigits: 2,
                    })
                    .slice(0, -3)}{" "}
                  Km • {item.hp} HP •{" "}
                  {item.fuel.charAt(0).toUpperCase() + item.fuel.slice(1)} •{" "}
                  {item.year}
                </Text>
              </Box>
              <HStack borderTop={"1px"} color="black">
                <Flex
                  p={4}
                  alignItems="center"
                  justifyContent={"space-between"}
                  roundedBottom={"sm"}
                  w="full"
                >
                  <Link to={`/announcements/${item._id}`}>
                    <Text fontSize={"md"} fontWeight={"semibold"}>
                      View more
                    </Text>
                  </Link>
                  <Link to={`/announcements/${item._id}`}>
                    <BsArrowUpRight />{" "}
                  </Link>
                </Flex>
                <Flex
                  p={4}
                  alignItems="center"
                  justifyContent={"space-between"}
                  roundedBottom={"sm"}
                  cursor="pointer"
                  onClick={() => setLiked(!liked)}
                >
                  {liked ? (
                    <BsHeartFill fill="red" fontSize={"24px"} />
                  ) : (
                    <BsHeart fontSize={"24px"} />
                  )}
                </Flex>
              </HStack>
            </Box>
          </Center>
        );
      })}
    </div>
  );
}

export default Main;
