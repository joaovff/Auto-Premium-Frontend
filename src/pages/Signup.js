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
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handlePaswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      const response = await signup({ email, name, password });
      if (response.data.message) {
        setPassword("");
        setEmail("");
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
      <Stack Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
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
                  <FormLabel htmlFor="name">Name </FormLabel>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    style={{ width: "300px" }}
                  />
                </FormControl>
                <br/>
              </Box>
              <Box>
                <FormControl id="email" isRequired>
                  <FormLabel htmlFor="email">Email address </FormLabel>
                  <Input
                    id="email"
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    style={{ width: "300px" }}
                  />
                </FormControl>
                <br/>

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
          <br/>

          <p>Already have an account?</p>
          <Link to="/login" style={{color: "#0000EE"}}>Login</Link>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Signup;
