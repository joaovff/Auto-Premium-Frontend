import { useEffect, useState } from "react";
import { getUser } from "../api";
import { useParams } from "react-router";
import { Box, Center, Flex, HStack, Heading, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import { Img } from "@chakra-ui/image";

function Favorites() {
  
  const [user, setUser] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    async function handleUser() {
      const response = await getUser(userId);
      setUser(response.data);
      console.log(response.data);
    }
    handleUser();
  }, [userId]);

  return (
    <div>
      <Text>{user.name} favorites:</Text>
      {/* {user.favorites.map((item) => {
        return (
          <Center
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            data-aos-duration="1000"
            key={item._id}
            py={6}
          >
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
                <Flex
                  p={4}
                  alignItems="center"
                  justifyContent={"space-between"}
                  roundedBottom={"sm"}
                  cursor="pointer"
                ></Flex>
              </HStack>
            </Box>
          </Center>
        );
      })} */}
    </div>
  );
}

export default Favorites;
