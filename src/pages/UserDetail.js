import { useContext, useEffect, useState } from "react";
import { getUser } from "../api";
import { useParams } from "react-router";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Img } from "@chakra-ui/image";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import { Avatar } from "@chakra-ui/react";
import { UserContext } from "../context/user.context";

function UserDetail() {
  const [user, setUser] = useState("");
  const { userId } = useParams();
  const { loggedUser } = useContext(UserContext);

  useEffect(() => {
    async function handleUser() {
      const response = await getUser(userId);
      setUser(response.data);
    }
    handleUser();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Stack>
          <CardBody>
            <br />
            {user && user.picture !== "" ? (
              <Avatar src={`${user.picture}`} size="lg" />
            ) : (
              <Avatar src="public/avataricon.png" size="lg" />
            )}
            <br />
            <Heading mt={5} size="md">{user.name}</Heading>
          </CardBody>
          <Divider />
          <CardFooter>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {user && user.announcements.length < 1 ? (
                <Text color="grey">
                  This user has not posted announcements yet
                </Text>
              ) : (
                <>
                  {user &&
                    user.announcements.map((announcement) => {
                      return (
                        <Center key={announcement._id} py={6}>
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
                                src={announcement.images[0]}
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
                              <Heading
                                color={"black"}
                                fontSize={"2xl"}
                                noOfLines={1}
                              >
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
                            </HStack>
                          </Box>
                        </Center>
                      );
                    })}
                </>
              )}
            </div>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
}
export default UserDetail;
