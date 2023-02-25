import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Text,
  Box,
  HStack,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  InputLeftAddon,
  Center,
} from "@chakra-ui/react";
import { MdEmail, MdOutlineEmail, MdPhone } from "react-icons/md";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { uploadImage, signup, UploadPicture } from "../api";

import { BsPerson } from "react-icons/bs";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handlePictureSelect(event) {
    setPicture(event.target.files[0]);
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }

  function handlePaswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      const uploadData = new FormData();
      uploadData.append("fileName", picture);
      const responseImage = await UploadPicture(uploadData);
      const response = await signup({
        email,
        name,
        password,
        picture: responseImage.data.fileUrl,
        phone,
      });
      if (response.data.message) {
        setPassword("");
        setEmail("");
        setPhone(null);
      } else {
        navigate("/");
      }
    } catch (e) {
      console.log(`error ${e}`);
    }
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      style={{ flexDirection: "column", marginTop: "-150px" }}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            To enjoy all of our cool cars!
          </Text>
        </Stack>
      </Stack>

      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <HStack>
            <Box>
              <Box>
                <FormControl id="name" isRequired>
                  <FormLabel htmlFor="name">Name</FormLabel>

                  <InputGroup>
                    <InputLeftElement children={<BsPerson />} />
                    <Input
                      type="text"
                      name="name"
                      value={name}
                      placeholder="Name Lastname"
                      onChange={handleNameChange}
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
              <Box>
                <FormControl id="email" isRequired>
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
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      onChange={handlePaswordChange}
                      type={showPassword ? "text" : "password"}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                        onChange={handlePaswordChange}
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Box>
              <form onSubmit={handleSubmitForm}>
                <br />
                <Button type="submit">Signup</Button>
              </form>
            </Box>
          </HStack>
          <br />

          <p>Already have an account?</p>
          <Link to="/login" style={{ color: "#0000EE" }}>
            Login
          </Link>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Signup;
