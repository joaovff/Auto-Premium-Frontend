import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tabs,
  Card,
  Stack,
  Center,
  Box,
  Img,
  Text,
  Heading,
  HStack,
  Flex,
  Avatar,
  AvatarBadge,
  IconButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getUser } from "../api";
import { UserContext } from "../context/user.context";

function Test() {
  const [user, setUser] = useState("");
  const { loggedUser } = useContext(UserContext);

  useEffect(() => {
    async function handleUser() {
      if (loggedUser) {
        const response = await getUser(loggedUser._id);
        setUser(response.data);
      }
    }
    handleUser();
  }, [loggedUser]);

  return (
    <Tabs isManual variant="enclosed" bg="white">
      <TabList mb="1em">
        <Tab>My profile</Tab>
        <Tab>My announcements</Tab>
        <Tab>Security</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex>
            <Box textAlign="left">
              <Box display="flex">
                <Avatar size="xl" src={user.picture}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                  
                </Avatar>{" "}
                <FormControl
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignContent: "flex-start",
                    flexDirection: "column",
                  }}
                  id="picture"
                >
                  <FormLabel htmlFor="picture">User Picture</FormLabel>
                  <Input
                    id="picture"
                    type="file"
                    name="fileName"
/*                     onChange={handlePictureSelect}
 */                    style={{ width: "300px" }}
                  />
                </FormControl>
              </Box>
              <Text>Name:</Text>
              <Text>Phone contact:</Text>
              <Text>Picture:</Text>
            </Box>
            <Box></Box>
          </Flex>
        </TabPanel>
        <TabPanel
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {user && user.announcements.length < 1 ? (
            <Text color="grey">You haven't announced anything yet.</Text>
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
                                Edit Announcement
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
          )}{" "}
        </TabPanel>
        <TabPanel>
          <p>sad</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Test;
