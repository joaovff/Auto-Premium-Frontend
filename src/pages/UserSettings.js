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
import { deleteUser, editUser, editUserGeneral, uploadImage, userSettings } from "../api";
import { MdOutlineEmail } from "react-icons/md";
import {
  DeleteIcon,
  EditIcon,
  EmailIcon,
  PhoneIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { deleteAnnouncement } from "../api";
import EditAnnouncementModal from "../components/EditAnnouncementModal";

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
  const navigate = useNavigate()

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

  async function handleGeneralSubmitForm(event) {
    event.preventDefault();
    try {
      const uploadData = new FormData();
      uploadData.append("fileName", picture);
      const responseImage = await uploadImage(uploadData);
      const response = await editUserGeneral(loggedUser._id, {
        name,
        picture: responseImage.data.fileUrl,
        phone,
      });

      if (response.status === 200) {
        console.log("User editado com sucesso");

        navigate(0)

      } else {
        console.log("User falhou");
      }
    } catch (error) {
      console.log(error);
    }

  }


  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      const response = await editUser(loggedUser._id, {email, password})

      if(response.status === 200) {
        console.log("user edited with success")
      } else {
        console.log("failed update")
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Flex style={{ display: "flex", flexDirection: "column" }}>
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
            <FormControl>
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

              <br />

              <FormLabel htmlFor="picture">User Picture</FormLabel>
              <Input
                id="picture"
                type="file"
                name="fileName"
                onChange={handlePictureSelect}
              />

              <CardFooter>
                <Button type="submit" onClick={handleGeneralSubmitForm}>
                  Edit
                </Button>
              </CardFooter>
            </FormControl>
          </CardBody>
        </Card>

        <br />

        <Card className="settings-cards">
          <CardHeader>
            <Heading size="md"> Security</Heading>
          </CardHeader>
          <CardBody>
            <FormControl>
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
              <Button type="submit" onClick={handleSubmitForm}>
                Edit
              </Button>
            </CardFooter>
          </CardBody>
        </Card>

        <br />

        <Card style={{ alignItems: "center" }} className="settings-cards">
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
                <Text py="2">
                  <EmailIcon /> {user.email}
                </Text>
                <br />
                {user.phone && (
                  <Text>
                    <PhoneIcon /> +351 {user.phone}
                  </Text>
                )}
              </>
            )}
            <CardFooter>
              <Button backgroundColor="red" color="white" onClick={deleteUser}>
                Delete User
              </Button>
            </CardFooter>
          </CardBody>
        </Card>
      </Box>

      <br />

      <Card>
        <CardHeader>
          <Heading size="md">My Announcements:</Heading>
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
                              <EditAnnouncementModal
                                announcementId={item._id}
                              />
                              {/* <Link to={`/announcements/edit/${item._id}`}>
                                  <Button>Edit 
                                    <EditIcon/> 
                                  </Button>
                                </Link> */}
                              <Button
                                style={{ color: "red" }}
                                onClick={() => deleteAnnouncement(item._id)}
                              >
                                {" "}
                                <DeleteIcon />{" "}
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
