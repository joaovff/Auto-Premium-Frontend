import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { userSettings } from "../api";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Divider, Heading, Stack, Text, HStack } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { Avatar, Center, Box, Flex, Img } from "@chakra-ui/react";
import { UserContext } from "../context/user.context";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";

function UserSettings() {
  const [user, setUser] = useState("");
  const { userId } = useParams();
  const { loggedUser } = useContext(UserContext);

  useEffect(() => {
    async function handleProfile() {
      const response = await userSettings(userId);
      setUser(response.data);
      console.log(response.data);
    }
    handleProfile();
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
            {!user.picture ? (
              <Avatar src="public/avataricon.png" size="lg" />
            ) : (
              <Avatar src={`${user.picture}`} size="lg" />
            )}
            <br />
            <Heading size="md">{user.name}</Heading>

            <br />
            {loggedUser && (
              <>
                <Text py="2">{user.email}</Text>
                {user.phone && <Text>+351 {user.phone}</Text>}
              </>
            )}
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
                    user.announcements.map((item) => {
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
                              <Heading
                                color={"black"}
                                fontSize={"2xl"}
                                noOfLines={1}
                              >
                                {item.title}
                              </Heading>
                              <Text color={"gray.500"} noOfLines={2}>
                                {item.kms
                                  .toLocaleString("pt-pt", {
                                    minimumFractionDigits: 2,
                                  })
                                  .slice(0, -3)}{" "}
                                Km • {item.hp} HP •{" "}
                                {item.fuel.charAt(0).toUpperCase() +
                                  item.fuel.slice(1)}{" "}
                                • {item.year}
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
                            </HStack>
                          </Box>
                        </Center>
                      );
                    })}
                </>
              )}
            </div>
          </CardFooter>
          <ButtonGroup>
            <Button type="solid" color="blue" to>
              <Link to={`/profile/edit/${user._id}`} >
              Edit User
              </Link>
              
            </Button>
            <Button  backgroundColor="red" color="white">
              Delete User
            </Button>
          </ButtonGroup>
        </Stack>
      </Card>
    </div>
  );
}

export default UserSettings;
