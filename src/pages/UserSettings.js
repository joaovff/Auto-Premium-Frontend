import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { userSettings } from "../api";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Divider, Heading, Stack, Text } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";


function UserSettings() {

    const [user, setUser] = useState("");
    const { userId } = useParams();
  
    useEffect(() => {
      async function handleProfile() {
        const response = await userSettings(userId);
        setUser(response.data);
        console.log(response.data)
      }
      handleProfile();
    }, []);

  return (
    <div>
        <Card maxW='sm'>
  <CardBody>
    <Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{user.name}</Heading>
      <Text>
        {user.email}
      </Text>
      <Text>
        {user.announcements}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='red'>
        Delete User
      </Button>
      <Button variant='solid' colorScheme='blue'>
        Edit User
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
    </div>
  )
}

export default UserSettings