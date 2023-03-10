import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteAnnouncement, getAnnouncement, getUser } from "../api";
import { Link } from "react-router-dom";
import Carousel from "../components/Corousel";
import MapsApi from "../components/MapsApi";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
  CircularProgress,
  AvatarGroup,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { Avatar, AvatarBadge, Skeleton } from "@chakra-ui/react";
import ContactModal from "../components/ContactModal";
import { UserContext } from "../context/user.context";

export default function Simple() {
  const [announcement, setAnnouncement] = useState();
  const { announcementId } = useParams();
  const { loggedUser } = useContext(UserContext);
  const [localization, setLocalization] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function handleGetAnnouncementDetail() {
      const response = await getAnnouncement(announcementId);
      setAnnouncement(response.data);
    }
    handleGetAnnouncementDetail();
  }, [announcementId]);

  useEffect(() => {
    function getLocal() {
      if (announcement) {
        const local = JSON.parse(announcement.localization);
        setLocalization(local);
      }
    }
    getLocal();
  }, [announcement]);

  return announcement ? (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex flexDirection="column">
          <Carousel carImages={announcement.images} />
          {localization !== "" ? (
            <MapsApi localization={localization} />
          ) : (
            <Spinner color="white" />
          )}
        </Flex>

        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {announcement.title}
            </Heading>
            <Text fontWeight={300} fontSize={"2xl"}>
              {announcement.price.toLocaleString("pt-pt", {
                minimumFractionDigits: 2,
              })}{" "}
              €
            </Text>
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider />}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>
                {announcement.description.charAt(0).toUpperCase() +
                  announcement.description.slice(1)}
              </Text>
            </VStack>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Specifications
              </Text>

              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "flex-start",
                }}
              >
                <List
                  textAlign="left"
                  spacing={2}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      KM:
                    </Text>
                    {"  "}
                    {announcement.kms
                      .toLocaleString("pt-pt", {
                        minimumFractionDigits: 2,
                      })
                      .slice(0, -3)}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Year:
                    </Text>{" "}
                    {announcement.year}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Make:
                    </Text>{" "}
                    {announcement.make}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Model:
                    </Text>{" "}
                    {announcement.model}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Color:
                    </Text>{" "}
                    {announcement.color.charAt(0).toUpperCase() +
                      announcement.color.slice(1)}
                  </ListItem>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      HP:
                    </Text>{" "}
                    {announcement.hp}
                  </ListItem>
                </List>

                <List
                  textAlign="left"
                  spacing={2}
                  ml={35}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Engine Displacement:
                    </Text>{" "}
                    {announcement.engineDisplacement} cm³
                  </ListItem>

                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Fuel:{" "}
                    </Text>{" "}
                    {announcement.fuel.charAt(0).toUpperCase() +
                      announcement.fuel.slice(1)}{" "}
                  </ListItem>

                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Doors:{" "}
                    </Text>{" "}
                    {announcement.doors}
                  </ListItem>

                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Traction:{" "}
                    </Text>{" "}
                    {announcement.traction.toUpperCase()}
                  </ListItem>

                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      Gear Box:{" "}
                    </Text>{" "}
                    {announcement.gearBox.charAt(0).toUpperCase() +
                      announcement.gearBox.slice(1)}
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Stack>
          <Divider />
          <Text
            fontSize={{ base: "16px", lg: "18px" }}
            fontWeight={"500"}
            textTransform={"uppercase"}
            mb={"4"}
            style={{ marginBottom: "-8%" }}
          >
            Contact
          </Text>
          <Box>
            {announcement.user ? (
              <>
                <Link to={`/profile/${announcement.user._id}`}>
                  {!announcement.user.picture ? (
                    <Avatar
                      src="https://bit.ly/broken-link"
                      size="lg"
                      style={{ marginTop: "25px" }}
                    />
                  ) : (
                    <Avatar
                      src={`${announcement.user.picture}`}
                      size="lg"
                      style={{ marginTop: "25px" }}
                    />
                  )}
                  <Text marginTop="10px">{announcement.user.name}</Text>
                </Link>
              </>
            ) : (
              <></>
            )}
          </Box>
          <ContactModal announcement={announcement} />{" "}
        </Stack>
      </SimpleGrid>
    </Container>
  ) : (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Skeleton
            rounded={"md"}
            fit={"cover"}
            align={"center"}
            w={"350px"}
            h={{ base: "100%", sm: "400px", lg: "350px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              <Skeleton height="20px" />
            </Heading>
            <Text fontWeight={300} fontSize={"2xl"}>
              <Skeleton height="20px" />
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider />}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Skeleton height="20px" />
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                <Skeleton height="20px" />
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>
                    <Skeleton height="20px" />
                  </ListItem>
                  <ListItem>
                    <Skeleton height="20px" />
                  </ListItem>
                  <ListItem>
                    <Skeleton height="20px" />
                  </ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>
                    <Skeleton height="20px" />
                  </ListItem>
                  <ListItem>
                    <Skeleton height="20px" />
                  </ListItem>
                  <ListItem>
                    <Skeleton height="20px" />
                  </ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Specifications
                </Text>

                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <List
                    textAlign="left"
                    spacing={2}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        KM:
                      </Text>
                      <Stack>
                        <Skeleton height="20px" />
                      </Stack>
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Year:
                      </Text>{" "}
                      <Stack>
                        <Skeleton height="20px" />
                      </Stack>
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Make:
                      </Text>{" "}
                      <Stack>
                        <Skeleton height="20px" />
                      </Stack>
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Model:
                      </Text>{" "}
                      <Stack>
                        <Skeleton height="20px" />
                      </Stack>
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Color:
                      </Text>{" "}
                      <Stack>
                        <Skeleton height="20px" />
                      </Stack>
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        HP:
                      </Text>{" "}
                      <Stack>
                        <Skeleton height="20px" />
                      </Stack>
                    </ListItem>
                  </List>

                  <List
                    textAlign="left"
                    spacing={2}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Engine Displacement:
                      </Text>{" "}
                      <Stack>
                        <Skeleton height="20px" />
                      </Stack>
                    </ListItem>

                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Fuel:{" "}
                      </Text>{" "}
                      <Stack>
                        <Skeleton height="20px" />
                      </Stack>
                    </ListItem>

                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Doors:{" "}
                      </Text>{" "}
                      <Stack>
                        <Skeleton height="20px" />
                      </Stack>
                    </ListItem>

                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Traction:{" "}
                      </Text>{" "}
                      <Stack>
                        <Skeleton height="20px" />
                      </Stack>
                    </ListItem>

                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Gear Box:{" "}
                      </Text>{" "}
                      <Stack>
                        <Skeleton height="20px" />
                      </Stack>
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
