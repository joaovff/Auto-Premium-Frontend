import { useEffect, useState } from "react";
import { getUser } from "../api";
import { useParams } from "react-router";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Image, Img } from "@chakra-ui/image";
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
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import { BsArrowUpRight, BsHeart, BsHeartFill } from "react-icons/bs";
import { Popover } from "antd";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";

function UserDetail() {
  const [user, setUser] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    async function handleUser() {
      const response = await getUser(userId);
      setUser(response.data);
    }
    handleUser();
  }, []);
  const [liked, setLiked] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Card maxW="sm">
        <CardBody>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{user.name}</Heading>
            <Text>{user.email}</Text>
            <Text>{user.phone}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Contact User
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>

      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
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
                    <Heading color={"black"} fontSize={"2xl"} noOfLines={1}>
                      {item.title}
                    </Heading>
                    <Text color={"gray.500"} noOfLines={2}>
                      {item.kms
                        .toLocaleString("pt-pt", {
                          minimumFractionDigits: 2,
                        })
                        .slice(0, -3)}{" "}
                      Km • {item.hp} HP •{" "}
                      {item.fuel.charAt(0).toUpperCase() + item.fuel.slice(1)} •{" "}
                      {item.year}
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
      </div>
    </div>
  );
}
export default UserDetail;
