import { Link } from "react-router-dom";
import { getAllAnnouncements, getMakes, getUser } from "../api";
import SearchBar from "../components/SearchBar";
import { useContext, useEffect, useState, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  HStack,
  Stack,
  Card,
  CardBody,
  CardFooter,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";
import "aos/dist/aos.css";
import { ArrowUpDownIcon, DragHandleIcon } from "@chakra-ui/icons";
import { UserContext } from "../context/user.context";
import { updateFavorites, getFavorites } from "../api";
import { deleteFavorites } from "../api";

function Main() {
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [announcements, setAnnoucements] = useState([]);

  const { loggedUser } = useContext(UserContext);

  const [className, setClassName] = useState("");
  const [toggle, setToggle] = useState(true);

  const [user, setUser] = useState(null);

  function handleSearch(keyword) {
    const filtered = announcements.filter((announcement) => {
      return announcement.title.toLowerCase().includes(keyword.toLowerCase());
    });
    setFilteredAnnouncements(filtered);
  }

  function handleMinKmsSearch(keyword) {
    const filtered = announcements.filter((announcement) => {
      return announcement.kms >= keyword;
    });
    setFilteredAnnouncements(filtered);
  }

  function handleMaxKmsSearch(keyword) {
    const filtered = announcements.filter((announcement) => {
      return announcement.kms <= keyword;
    });
    setFilteredAnnouncements(filtered);
  }

  function handleMinYearsSearch(keyword) {
    const filtered = announcements.filter((announcement) => {
      return announcement.year >= keyword;
    });
    setFilteredAnnouncements(filtered);
  }

  function handleMaxYearsSearch(keyword) {
    const filtered = announcements.filter((announcement) => {
      return announcement.year <= keyword;
    });
    setFilteredAnnouncements(filtered);
  }

  function handleMinPriceSearch(keyword) {
    const filtered = announcements.filter((announcement) => {
      return announcement.price >= keyword;
    });
    setFilteredAnnouncements(filtered);
  }

  function handleMaxPriceSearch(keyword) {
    const filtered = announcements.filter((announcement) => {
      return announcement.price <= keyword;
    });
    setFilteredAnnouncements(filtered);
  }

  function handleFuelSearch(keyword) {
    const filtered = announcements.filter((announcement) => {
      return announcement.fuel === keyword;
    });
    setFilteredAnnouncements(filtered);
  }
  

  function sortByPrice() {
    const sorted = [...announcements].sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
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
    async function handleUser() {
      if (loggedUser) {
        const response = await getUser(loggedUser._id);
        setUser(response.data);
      }
    }
    handleUser();
  }, [loggedUser, toggle]);

  async function handleGetAllAnnouncements() {
    const response = await getAllAnnouncements();
    setFilteredAnnouncements(response.data);
    setAnnoucements(response.data);
  }

  useEffect(() => {
    handleGetAllAnnouncements();
  }, [loggedUser]);

  function addToFavorites(itemId) {
    updateFavorites(loggedUser._id, { itemId: itemId });
    setToggle(!toggle);
  }

  async function deleteFavoritess(itemId, userId) {
    await deleteFavorites(userId, itemId);
    await handleGetAllAnnouncements();
    setToggle(!toggle);
  }

  function switchDisplay() {
    if (className === "flex") {
      setClassName("");
    } else {
      setClassName("flex");
    }
  }

  if (className === "") {
    return (
      <div>
        <SearchBar
          handleSearch={handleSearch}
          handleMinKmsSearch={handleMinKmsSearch}
          handleMaxKmsSearch={handleMaxKmsSearch}
          handleMinYearsSearch={handleMinYearsSearch}
          handleMaxYearsSearch={handleMaxYearsSearch}
          handleMinPriceSearch={handleMinPriceSearch}
          handleMaxPriceSearch={handleMaxPriceSearch}
          handleFuelSearch={handleFuelSearch}
        />

        <Flex justifyContent="end" mt={4}>
          <IconButton
            aria-label="Search database"
            onClick={switchDisplay}
            icon={<DragHandleIcon />}
            className="switchBtn"
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
          className={className}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {filteredAnnouncements.map((announcement) => {
            return (
              <Center
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
                data-aos-duration="1000"
                key={announcement._id}
                py={6}
              >
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
                      src={announcement.image}
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
                        {announcement.price.toLocaleString("pt-pt", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        €
                      </Text>
                    </Box>
                    <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
                      {announcement.title}
                    </Heading>
                    <Text color={"gray.500"} noOfLines={2}>
                      {announcement.kms
                        .toLocaleString("pt-pt", {
                          minimumFractionDigits: 2,
                        })
                        .slice(0, -3)}{" "}
                      Km • {announcement.hp} HP •{" "}
                      {announcement.fuel.charAt(0).toUpperCase() +
                        announcement.fuel.slice(1)}{" "}
                      • {announcement.year}
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
                      <Link to={`/announcements/${announcement._id}`}>
                        <Text fontSize={"md"} fontWeight={"semibold"}>
                          View more
                        </Text>
                      </Link>
                      <Link to={`/announcements/${announcement._id}`}>
                        <BsArrowUpRight />{" "}
                      </Link>
                    </Flex>
                    {loggedUser && (
                      <Flex
                        p={4}
                        alignItems="center"
                        justifyContent={"space-between"}
                        roundedBottom={"sm"}
                        cursor="pointer"
                      >
                        {user && user.favorites.includes(announcement._id) ? (
                          <BsHeartFill
                            onClick={() =>
                              deleteFavoritess(announcement._id, loggedUser._id)
                            }
                            fill="red"
                            fontSize={"24px"}
                          />
                        ) : (
                          <BsHeart
                            onClick={() => addToFavorites(announcement._id)}
                            fontSize={"24px"}
                          />
                        )}
                      </Flex>
                    )}
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
        <SearchBar
          handleSearch={handleSearch}
          handleMinKmsSearch={handleMinKmsSearch}
          handleMaxKmsSearch={handleMaxKmsSearch}
          handleMinYearsSearch={handleMinYearsSearch}
          handleMaxYearsSearch={handleMaxYearsSearch}
          handleMinPriceSearch={handleMinPriceSearch}
          handleMaxPriceSearch={handleMaxPriceSearch}
          handleFuelSearch={handleFuelSearch}
        />
        <Flex justifyContent="end" mt={2} mb={2}>
          <IconButton
            aria-label="Search database"
            onClick={switchDisplay}
            icon={<DragHandleIcon />}
            className="switchBtn"
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
      
        {filteredAnnouncements.map((announcement) => {
          return (
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              marginBottom="10px"
              bg="white"
              boxShadow={"2xl"}
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1000"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "300px" }}
                src={announcement.image}
                alt={announcement.title}
              />

              <Stack>
                <CardBody>
                  <div style={{ display: "flex" }}>
                    <Heading textAlign="start" size="md">
                      {announcement.title}
                    </Heading>
                  </div>

                  <Text textAlign="start" color="grey" py="2" text>
                    {announcement.kms
                      .toLocaleString("pt-pt", {
                        minimumFractionDigits: 2,
                      })
                      .slice(0, -3)}{" "}
                    Km • {announcement.hp} HP •{" "}
                    {announcement.fuel.charAt(0).toUpperCase() +
                      announcement.fuel.slice(1)}{" "}
                    • {announcement.year}
                  </Text>
                </CardBody>

                {loggedUser && (
                  <CardFooter>
                    <Flex
                      p={4}
                      alignItem="center"
                      justifyContent={"space-between"}
                      roundedBottom={"sm"}
                      cursor="pointer"
                    >
                      {user && user.favorites.includes(announcement._id) ? (
                        <BsHeartFill
                          onClick={() =>
                            deleteFavoritess(announcement._id, loggedUser._id)
                          }
                          fill="red"
                          fontSize={"24px"}
                        />
                      ) : (
                        <BsHeart
                          onClick={() => addToFavorites(announcement._id)}
                          fontSize={"24px"}
                        />
                      )}
                    </Flex>
                  </CardFooter>
                )}
              </Stack>
              <Box p={4}></Box>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default Main;
