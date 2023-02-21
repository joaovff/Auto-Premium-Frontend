import { Link } from "react-router-dom";
import { getAllAnnouncements, getMakes } from "../api";
import SearchBar from "../components/SearchBar";
import { useContext, useEffect, useState, useRef } from "react";
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
  Image,
  CardHeader,
  StackDivider,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";

import { ArrowUpDownIcon, DragHandleIcon, SearchIcon } from "@chakra-ui/icons";
import { UserContext } from "../context/user.context";
import { updateFavorites, getFavorites } from "../api";

function Main() {
  function handleSearch(keyword) {
    const filtered = announcements.filter((announcement) => {
      return announcement.title.toLowerCase().includes(keyword.toLowerCase());
    });
    setFilteredAnnouncements(filtered);
  }
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [announcements, setAnnoucements] = useState([]);

  const { loggedUser } = useContext(UserContext);

  const [favorites, setFavorites] = useState([]);

  const [className, setClassName] = useState("");

  const ref = useRef(null);

  function sortByPrice() {
    const sorted = [...announcements].sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
    console.log(sorted);
    setFilteredAnnouncements(sorted);
  }
  function sortByHp() {
    const sorted = [...announcements].sort((a, b) => (a.hp > b.hp ? 1 : -1));
    setFilteredAnnouncements(sorted);
  }
  function sortByKms() {
    const sorted = [...announcements].sort((a, b) => (a.kms > b.kms ? 1 : -1));
    setFilteredAnnouncements(sorted);
  }

  useEffect(() => {
    async function handleGetAllAnnouncements() {
      const response = await getAllAnnouncements();
      setFilteredAnnouncements(response.data);
      setAnnoucements(response.data);
    }
    handleGetAllAnnouncements();
  }, [loggedUser]);

  function addToFavorites(itemId) {
    setFavorites([...favorites, itemId]);
    updateFavorites(loggedUser._id, { itemId: itemId });
  }

  useEffect(() => {
    async function handleFavorites() {
      return await getFavorites(loggedUser._id);
    }
    //   handleFavorites();
  }, [loggedUser]);

  function switchDisplay() {
    if (className === "") {
      setClassName("flex");
    } else {
      setClassName("");
    }
  }

  if (className === "flex") {
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
          <IconButton
            aria-label="Search database"
            onClick={switchDisplay}
            icon={<DragHandleIcon />}
          />
          <Popover placement="bottom" isLazy>
            <PopoverTrigger>
              <IconButton
                aria-label="More server options"
                icon={<ArrowUpDownIcon />}
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
                    onClick={sortByPrice}
                  >
                    Price
                  </Button>
                  <Button
                    w="194px"
                    variant="ghost"
                    justifyContent="space-between"
                    fontWeight="normal"
                    fontSize="sm"
                    onClick={sortByHp}
                  >
                    HP
                  </Button>
                  <Button
                    w="194px"
                    variant="ghost"
                    justifyContent="space-between"
                    fontWeight="normal"
                    fontSize="sm"
                    onClick={sortByKms}
                  >
                    KM
                  </Button>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
        <div ref={ref} className={className}>
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
                      onClick={() => addToFavorites(item._id)}
                    >
                      {favorites.includes(item._id) ? (
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
      </div>
    );
  } else {
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
          <IconButton
            aria-label="Search database"
            onClick={switchDisplay}
            icon={<DragHandleIcon />}
          />
          <Popover placement="bottom" isLazy>
            <PopoverTrigger>
              <IconButton
                aria-label="More server options"
                icon={<ArrowUpDownIcon />}
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
                    onClick={sortByPrice}
                  >
                    Price
                  </Button>
                  <Button
                    w="194px"
                    variant="ghost"
                    justifyContent="space-between"
                    fontWeight="normal"
                    fontSize="sm"
                    onClick={sortByHp}
                  >
                    HP
                  </Button>
                  <Button
                    w="194px"
                    variant="ghost"
                    justifyContent="space-between"
                    fontWeight="normal"
                    fontSize="sm"
                    onClick={sortByKms}
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
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              marginBottom="10px"
              bg="white"
              boxShadow={"2xl"}
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "300px" }}
                src={item.image}
                alt={item.title}
              />

              <Stack>
                <CardBody>
                  <div style={{ display: "flex" }}>
                    <Heading textAlign="start" size="md">
                      {item.title}
                    </Heading>
                  </div>

                  <Text textAlign="start" color="grey" py="2" text>
                    {item.kms
                      .toLocaleString("pt-pt", {
                        minimumFractionDigits: 2,
                      })
                      .slice(0, -3)}{" "}
                    Km • {item.hp} HP •{" "}
                    {item.fuel.charAt(0).toUpperCase() + item.fuel.slice(1)} •{" "}
                    {item.year}
                  </Text>
                </CardBody>

                <CardFooter>
                  <Button variant="solid" colorScheme="blue">
                    Buy Latte
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          );
        })}
      </div>
    );
  }
  /* return (
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
        <IconButton
          aria-label="Search database"
          onClick={switchDisplay}
          icon={<DragHandleIcon />}
        />
        <Popover placement="bottom" isLazy>
          <PopoverTrigger>
            <IconButton
              aria-label="More server options"
              icon={<ArrowUpDownIcon />}
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
                  onClick={sortByPrice}
                >
                  Price
                </Button>
                <Button
                  w="194px"
                  variant="ghost"
                  justifyContent="space-between"
                  fontWeight="normal"
                  fontSize="sm"
                  onClick={sortByHp}
                >
                  HP
                </Button>
                <Button
                  w="194px"
                  variant="ghost"
                  justifyContent="space-between"
                  fontWeight="normal"
                  fontSize="sm"
                  onClick={sortByKms}
                >
                  KM
                </Button>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      <div
        ref={ref}
        className={className}

      >
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
                    onClick={() => addToFavorites(item._id)}
                  >
                    {favorites.includes(item._id) ? (
                      <BsHeartFill fill="red" fontSize={"24px"} />
                    )  : (
                      <BsHeart fontSize={"24px"} />
                    )}
                  </Flex>
                </HStack>
              </Box>
            </Center>
          );
        })}
      </div>
    </div>
  ); */
}

export default Main;
