import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { NavLink } from "react-router-dom";
import { getUser } from "../api";
import { useState, useEffect } from "react";

export default function SimpleSidebar({ children, handleSettings }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user, setUser] = useState("");
  const { loggedUser } = useContext(UserContext);

  function handleSettingsTypeProfile(type) {
    handleSettings(type);
  }

  function handleSettingsTypeAnnouncement(type) {
    handleSettings(type);
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

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        user={user}
        handleSettingsTypeProfile={() => handleSettingsTypeProfile("profile")}
        handleSettingsTypeAnnouncement={() =>
          handleSettingsTypeAnnouncement("announcement")
        }
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
        user={user}
      >
        <DrawerContent>
          <SidebarContent user={user} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav
        display={{ base: "flex", md: "none" }}
        user={user}
        onOpen={onOpen}
      />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({
  handleSettingsTypeAnnouncement,
  handleSettingsTypeProfile,
  user,
  onClose,
  ...rest
}) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {user.name}
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <>
        <NavLink onClick={handleSettingsTypeProfile}>
          <NavItem>Edit Profile</NavItem>
        </NavLink>

        <NavLink onClick={handleSettingsTypeAnnouncement}>
          <NavItem>Edit Announcement</NavItem>
        </NavLink>
      </>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ user, onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        {user.name}
      </Text>
    </Flex>
  );
};
