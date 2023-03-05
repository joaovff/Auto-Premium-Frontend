import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user.context";
import { Input, InputLeftElement } from "@chakra-ui/react";
import {
  Button,
  Flex,
  Heading,
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
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { authenticateUser } = useContext(UserContext);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePaswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem("authToken", response.data);
      authenticateUser();
      navigate("/");
    } catch (e) {
      toast.error(
        `Sorry, we couldn't log you in with the information provided. Please check your login credentials and try again.`
      );
    }
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg="transparent"
      style={{ flexDirection: "column" }}
      mt={-150}
    >
      <Stack Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Some text{" "}
          </Text>
        </Stack>
      </Stack>

      <Box rounded={"lg"} boxShadow={"lg"} p={8} className="loginCard">
        <Stack spacing={4}>
          <HStack>
            <Box>
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
                      style={{ width: "350px" }}
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
                <Button type="submit">Login</Button>
              </form>
            </Box>
          </HStack>
          <br />

          <p>Don't have an account?</p>
          <Link to="/signup" style={{ color: "#0000EE" }}>
            Signup
          </Link>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Login;
