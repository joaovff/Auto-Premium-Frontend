/* import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { userSettings } from "../api";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Divider, Heading, Stack, Text, HStack } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { Avatar, Center, Box, Flex, Img } from "@chakra-ui/react";
import { UserContext } from "../context/user.context";
import { BsArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom"; */

/* function UserSettings() {
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
 */

//IMPORTS TO SIDEBAR
/* import { useState } from "react";
import SimpleSidebar from "../components/SimpleSideBar";
import EditAnnouncement from "../components/EditAnnouncement";
import EditProfile from "../components/EditProfile"; */

//FUNCTION WITH THE SIDE BAR

/* function UserSettings() {
  const [settingsType, setSettingsType] = useState("profile");

  function handleSettingsType(type) {
    setSettingsType(type);
    console.log(settingsType);
  }

  return (
    <div>
      <div id="userSettingsLayout">
        <SimpleSidebar handleSettings={handleSettingsType} />
        {settingsType === "profile" ? <EditProfile /> : <EditAnnouncement />}
      </div>
    </div>
  );
} */

//cards but not responsive
//----------------------------------------------------------------------------------------

/* import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  Img,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import { editUser, uploadImage, userSettings } from "../api";
import { MdOutlineEmail } from "react-icons/md";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useParams } from "react-router-dom";


function UserSettings() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState("");

  const [showPassword, setShowPassword] = useState(false);

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
  }, [userId]);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }

  function handlePictureSelect(event) {
    setPicture(event.target.files[0]);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      const uploadData = new FormData();
      uploadData.append("fileName", picture);
      const responseImage = await uploadImage(uploadData);
      const response = await editUser(loggedUser._id, {
        email,
        name,
        password,
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
    <Flex wrap={'wrap'} >
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns={{sm: "repeat(5, 1fr)", base: "repeat(auto-fill, 0.5fr)" }}
        gap={4}
        flexWrap={'wrap'}
      >
        <GridItem   >
          <Card>
            <CardHeader>
              <Heading size="md"> General</Heading>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmitForm}>
                <Box>
                  <FormControl>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl id="phone">
                    <FormLabel htmlFor="phone">Phone Number </FormLabel>
                    <InputGroup>
                      <InputLeftAddon children="+351" />
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        style={{ width: "300px" }}
                        placeholder="Phone number"
                      />
                    </InputGroup>
                  </FormControl>

                  <br />
                </Box>

                <FormControl id="picture">
                  <FormLabel htmlFor="picture">User Picture</FormLabel>
                  <Input
                    id="picture"
                    type="file"
                    name="fileName"
                    onChange={handlePictureSelect}
                    style={{ width: "300px" }}
                  />
                </FormControl>

                <CardFooter>
                  <Button type="submit">Edit</Button>
                </CardFooter>
              </form>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem colSpan={3}>
          <Card>
            <CardHeader>
              <Heading size="md"> Security</Heading>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmitForm}>
                <Box>
                  <FormControl id="email">
                    <FormLabel htmlFor="email">Email</FormLabel>

                    <InputGroup>
                      <InputLeftElement children={<MdOutlineEmail />} />
                      <Input
                        id="email"
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </InputGroup>
                  </FormControl>

                  <br />
                </Box>

                <Box>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        onChange={handlePasswordChange}
                        type={showPassword ? "text" : "password"}
                      />
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                          onChange={handlePasswordChange}
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </Box>
                <CardFooter>
                  <Button type="submit">Edit</Button>
                </CardFooter>
              </form>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem colSpan={2}>
          <Card style={{ alignItems:"center"}}>
          <br />
            {!user.picture ? (
              <Avatar src="public/avataricon.png" size="lg" />
            ) : (
              <Avatar src={`${user.picture}`} size="lg" />
            )}
            <br />
            <CardHeader>
              <Heading size="md">{user.name}</Heading>
            </CardHeader>
            <CardBody>
            {loggedUser && (
              <>
                <Text py="2">{user.email}</Text>
                {user.phone && <Text>+351 {user.phone}</Text>}
              </>
            )}
            </CardBody>
            <CardFooter>
            <Button  backgroundColor="red" color="white">
              Delete User
            </Button>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem colSpan={4}>
          <Card>
            <CardHeader>
              <Heading size="md"> Edit an announcement</Heading>
            </CardHeader>
            <CardBody>
            <Flex
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
                                src={item.images[0]}
                                roundedTop={"sm"}
                                objectFit="cover"
                                h="full"
                                w="full"
                                alt={"Blog Image"}
                              />
                            </Box>
                            <Box p={4}>
                              <Heading
                                color={"black"}
                                fontSize={"2xl"}
                                noOfLines={1}
                              >
                                {item.title}
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
                                <Link to={`/announcements/edit/${item._id}`}>
                                  <Button>Edit</Button>
                                </Link>
                              </Flex>
                            </HStack>
                          </Box>
                        </Center>
                      );
                    })}
                </>
              )}
            </Flex>      
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Flex>
  );
}


export default UserSettings; */

import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Img,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import { deleteUser, editUser, uploadImage, userSettings } from "../api";
import { MdOutlineEmail } from "react-icons/md";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useParams } from "react-router-dom";
import { deleteAnnouncement } from "../api";

function UserSettings() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState("");
  const { userId } = useParams();
  const { loggedUser } = useContext(UserContext);

  useEffect(() => {
    async function handleProfile() {
      const response = await userSettings(userId);
      setUser(response.data);
    }
    handleProfile();
  }, [userId]);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }

  function handlePictureSelect(event) {
    setPicture(event.target.files[0]);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      const uploadData = new FormData();
      uploadData.append("fileName", picture);
      const responseImage = await uploadImage(uploadData);
      const response = await editUser(loggedUser._id, {
        email,
        name,
        password,
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
    <Flex
      className="settings-page"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Box
        className="settings-box"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Card className="settings-cards">
          <CardHeader>
            <Heading size="md"> General</Heading>
          </CardHeader>
          <CardBody>
            <FormControl className="settings-body" onSubmit={handleSubmitForm}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
              />

              <FormLabel htmlFor="phone">Phone Number </FormLabel>
              <InputGroup>
                <InputLeftAddon children="+351" />
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Phone number"
                />
              </InputGroup>


              <FormLabel htmlFor="picture">User Picture</FormLabel>
              <Input
                id="picture"
                type="file"
                name="fileName"
                onChange={handlePictureSelect}
              />

              <CardFooter>
                <Button type="submit">Edit</Button>
              </CardFooter>
            </FormControl>
          </CardBody>
        </Card>


        <Card className="settings-cards">
          <CardHeader>
            <Heading size="md"> Security</Heading>
          </CardHeader>
          <CardBody>
            <FormControl onSubmit={handleSubmitForm}>
              <FormLabel htmlFor="email">Email</FormLabel>

              <InputGroup>
                <InputLeftElement children={<MdOutlineEmail />} />
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                />
              </InputGroup>
            </FormControl>


            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  onChange={handlePasswordChange}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                    onChange={handlePasswordChange}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <CardFooter>
              <Button type="submit">Edit</Button>
            </CardFooter>
          </CardBody>
        </Card>


        <Card style={{ alignItems: "center" }} className="settings-cards">
          <br />
          {!user.picture ? (
            <Avatar src="public/avataricon.png" size="lg" />
          ) : (
            <Avatar src={`${user.picture}`} size="lg" />
          )}
          <CardHeader>
            <Heading size="md">{user.name}</Heading>
          </CardHeader>
          <CardBody>
            {loggedUser && (
              <>
                <Text py="2">{user.email}</Text>
                {user.phone && <Text>+351 {user.phone}</Text>}
              </>
            )}
          </CardBody>
          <CardFooter>
            <Button onClick={deleteUser} backgroundColor="red" color="white">
              Delete User
            </Button>
          </CardFooter>
        </Card>
      </Box>

      <Card bg="#171923" className="announcement-settings">
        <CardBody bg="#171923" className="announcement-body-settings">
          <Flex
            style={{
              display: "flex",
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
                      <Center bg="#171923" key={item._id} py={6}>
                        <Box
                          w="xs"
                          rounded={"sm"}
                          my={5}
                          mx={[0, 5]}
                          overflow={"hidden"}
                          boxShadow={"2xl"}
                          bg="#2D3748"
                        >
                          <Box h={"200px"}>
                            <Img
                              src={item.images[0]}
                              roundedTop={"sm"}
                              objectFit="cover"
                              h="full"
                              w="full"
                              alt={"Blog Image"}
                            />
                          </Box>
                          <Box p={4}>
                            <Heading fontSize={"2xl"} noOfLines={1}>
                              {item.title}
                            </Heading>
                          </Box>
                          <HStack borderTop={"1px"}>
                            <Flex
                              p={4}
                              alignItems="center"
                              justifyContent={"space-between"}
                              roundedBottom={"sm"}
                              w="full"
                            >
                              <Link to={`/announcements/edit/${item._id}`}>
                                <Button
                                  style={{
                                    backgroundColor: "grey",
                                    color: "black",
                                  }}
                                >
                                  Edit
                                </Button>
                              </Link>
                              <Button
                                style={{
                                  backgroundColor: "red",
                                  color: "white",
                                }}
                                onClick={deleteAnnouncement}
                              >
                                Delete
                              </Button>
                            </Flex>
                          </HStack>
                        </Box>
                      </Center>
                    );
                  })}
              </>
            )}
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default UserSettings;
