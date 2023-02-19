import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteAnnouncement, getAnnouncement, getUser } from "../api";
import { Link } from "react-router-dom";

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
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { Avatar, AvatarBadge, Skeleton } from "@chakra-ui/react";
import { Divider } from "antd";

export default function Simple() {
  const [announcement, setAnnouncement] = useState();
  const { announcementId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function handleGetAnnouncementDetail() {
      const response = await getAnnouncement(announcementId);
      setAnnouncement(response.data);
    }
    handleGetAnnouncementDetail();
    console.log(announcement);
  }, [announcementId]);

  async function handleDeleteAnnouncement() {
    await deleteAnnouncement(announcementId);
    navigate("/");
  }

  return announcement ? (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={announcement.title}
            src={announcement.image}
            fit={"cover"}
            align={"center"}
            w={"100%"}
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
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Chronograph</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem>{" "}
                  <ListItem>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Anti‑magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem>
                </List>
              </SimpleGrid>
            </Box>

            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Specifications
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Kms:
                  </Text>{" "}
                  {announcement.kms}
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
            Contacts
          </Text>
          {announcement.user ? (
            <>
              <Link to={`/profile/${announcement.user._id}`}>
                <Avatar bg="teal.500" style={{ marginTop: "25px" }} />
                <Text marginTop="10px">{announcement.user.name}</Text>
              </Link>
            </>
          ) : (
            <>
              <Spinner color="red.500" />
              <Text>Loading seller info</Text>
            </>
          )}
          <Link
            to={`/announcements/edit/${announcement._id}`}
            style={{ color: "#0000EE" }}
          >
            <Text>Edit</Text>
          </Link>
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
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Specs
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Kms:
                  </Text>
                  <Stack>
                    <Skeleton height="20px" />
                  </Stack>
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Year:
                  </Text>
                  <Skeleton height="20px" />
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Make:
                  </Text>
                  <Skeleton height="20px" />
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Model:
                  </Text>
                  <Skeleton height="20px" />
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Color:
                  </Text>
                  <Skeleton height="20px" />
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    HP:
                  </Text>
                  <Skeleton height="20px" />
                </ListItem>
              </List>
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
