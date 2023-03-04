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
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { Form, Link } from "react-router-dom";
import { editUser, getUser, uploadImage } from "../api";
import { UserContext } from "../context/user.context";

function Test() {
  const [user, setUser] = useState("");
  const { loggedUser } = useContext(UserContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }

  function handlePictureSelect(event) {
    setPicture(event.target.files[0]);
  }

  useEffect(() => {
    async function handleUser() {
      if (loggedUser) {
        const response = await getUser(loggedUser._id);
        setUser(response.data);
      }
    }
    handleUser();
  }, [loggedUser]);

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      const uploadData = new FormData();
      uploadData.append("fileName", picture);
      const responseImage = await uploadImage(uploadData);
      const response = await editUser(loggedUser._id, {
        name,
        picture: responseImage.data.fileUrl,
        phone,
      });

      if (response.status === 200) {
        console.log("User editado com sucesso");
      } else {
        console.log("User falhou");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Tabs isManual variant="enclosed" bg="white">
      <TabList mb="1em" color="black">
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
                    onChange={handlePictureSelect}
                  />
                </FormControl>
                <Flex flexDirection="column">
                  <FormControl color="black" display="flex">
                    <FormLabel m={2} htmlFor="name">
                      Name:
                    </FormLabel>
                    <Input
                      border="1px solid #E2E8F0"
                      id="name"
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </FormControl>

                  <FormControl color="black" display="flex">
                    <FormLabel m={2} htmlFor="phone">
                      Phone:
                    </FormLabel>
                    <InputGroup>
                      <InputLeftAddon
                        border="1px solid #E2E8F0"
                        bg="#E2E8F0"
                        children="+351"
                      />
                      <Input
                        border="1px solid #E2E8F0"
                        color="black"
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="Phone number"
                      />
                    </InputGroup>
                  </FormControl>
                </Flex>
              </Box>
            </Box>
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
                            <Link
                              to={`/announcements/edit/${announcement._id}`}
                            >
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
