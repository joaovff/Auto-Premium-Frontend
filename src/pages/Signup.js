import {
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Text,
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  InputLeftAddon,
  FormHelperText,
  Progress,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { uploadImage, signup, UploadPicture } from "../api";
import { toast } from "react-toastify";
import { BsPerson } from "react-icons/bs";
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

import "./styles/signup.css";

function Signup() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const totalSteps = 4;

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

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  function handlePictureDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      setPicture(file);
    }
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const uploadData = new FormData();
      uploadData.append("fileName", picture);
      const responseImage = await UploadPicture(uploadData);
      const response = await signup({
        email,
        name,
        password,
        picture: responseImage.data.fileUrl,
        phone: `351${phone}`,
      });
      if (response.data.message) {
        toast.info(response.data.message);
        setPassword("");
        setEmail("");
        setPhone(null);
      } else {
        navigate("/login");
      }
    } catch (e) {
      toast.error(`${e.response.data.message}`);
    }
  }

  const handleNext = () =>
    setStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  const handlePrev = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg="transparent"
      style={{ flexDirection: "column" }}
      mt={-10}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={"lg"}
        py={12}
        px={6}
        overflowX="auto"
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
      </Stack>

      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
        maxWidth={"85vw"}
      >
        <Progress
          value={(step / totalSteps) * 100}
          mb={4}
          size="sm"
          colorScheme="green"
          className="progress-bar"
        />

        <Stack spacing={4}>
          {step === 1 && (
            <Box>
              <FormControl id="name" isRequired>
                <FormLabel htmlFor="name">Name</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<BsPerson />} />
                  <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="email" isRequired mt={4}>
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
              <Button mt={4} onClick={handleNext}>
                <MdOutlineKeyboardDoubleArrowRight fontSize="18px" />
              </Button>
            </Box>
          )}

          {step === 2 && (
            <Box>
              <FormControl id="phone">
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
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
              </FormControl>

              <Button mt={4} mr={4} onClick={handlePrev}>
                <MdOutlineKeyboardDoubleArrowLeft fontSize="18px" />
              </Button>
              <Button mt={4} onClick={handleNext}>
                <MdOutlineKeyboardDoubleArrowRight fontSize="18px" />
              </Button>
            </Box>
          )}

          {step === 3 && (
            <Box>
              <FormControl id="picture">
                <FormLabel htmlFor="picture">User Picture</FormLabel>
                <Input
                  id="picture"
                  type="file"
                  name="fileName"
                  onChange={handlePictureSelect}
                  onDrop={handlePictureDrop}
                  onDragOver={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  style={{ width: "300px" }}
                />
                <FormHelperText>
                  Users with a photo sell their cars 65% faster.
                </FormHelperText>
              </FormControl>
              <Button mt={4} mr={4} onClick={handlePrev}>
                <MdOutlineKeyboardDoubleArrowLeft fontSize="18px" />
              </Button>
              <Button mt={4} onClick={handleNext}>
                <MdOutlineKeyboardDoubleArrowRight />
              </Button>
            </Box>
          )}

          {step === 4 && (
            <Box>
              <form onSubmit={handleSubmitForm}>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={handlePasswordChange}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="confirmPassword" isRequired mt={4}>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={handleConfirmPasswordChange}
                    />
                  </InputGroup>
                </FormControl>
                <Button mt={4} mr={4} onClick={handlePrev}>
                  <MdOutlineKeyboardDoubleArrowLeft />
                </Button>
                <Button type="submit" mt={4}>
                  Sign up
                </Button>
              </form>
            </Box>
          )}
        </Stack>
      </Box>
      <Text mt={4}>
        Already have an account?{" "}
        <Link
          to="/login"
          style={{ textDecoration: "underline", color: "#bcd2f2" }}
        >
          Login
        </Link>
        .
      </Text>
    </Flex>
  );
}

export default Signup;
