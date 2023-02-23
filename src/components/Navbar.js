import { useContext, useEffect, useState } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiHeart,
  FiPlusSquare,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/user.context";
import { getUser } from "../api";

const LinkItems = [
  { name: "Home", icon: FiHome, to: "/" },
  { name: "Sell a Car", icon: FiPlusSquare, to: "/announcements/create" },
  { name: "Favourites", icon: FiHeart, to: "/" },
  { name: "Settings", icon: FiSettings, to: `/` },
];
export default function SidebarWithHeader({ children }) {
  const { loggedUser, logout } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user, setUser] = useState("");

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
      {" "}
      {/* bg: altera a cor background das childs da navbar(area principal)  */}
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        loggedUser={loggedUser}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
        loggedUser={loggedUser}
      >
        <DrawerContent>
          <SidebarContent loggedUser={loggedUser} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav
        onOpen={onOpen}
        loggedUser={loggedUser}
        logout={logout}
        user={user}
      />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, loggedUser, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      className="sidebar"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <NavLink to="/">
          <img
            src="https://res.cloudinary.com/dpk07trsw/image/upload/v1677008021/auto-premium/aologo_okqooj.png"
            width={"50px"}
          />
        </NavLink>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {/* 
      {LinkItems.map((link) => (
        <NavLink key={link.name} to={link.to}>
          <NavItem icon={link.icon}>{link.name}</NavItem>
        </NavLink>
      ))} */}

      {loggedUser ? (
        <>
          <NavLink to="/">
            <NavItem icon={FiHome}>Home</NavItem>
          </NavLink>

          <NavLink to="/announcements/create">
            <NavItem icon={FiPlusSquare}>Sell a Car</NavItem>
          </NavLink>

          <NavLink to={`/profile/favorites/${loggedUser._id}`}>
            <NavItem icon={FiHeart}>Favorites</NavItem>
          </NavLink>

          <NavLink to={`/profile/settings/${loggedUser._id}`}>
            <NavItem icon={FiSettings}>Settings</NavItem>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/">
            <NavItem icon={FiHome}>Home</NavItem>
          </NavLink>

          <NavLink to="/login">
            <NavItem icon={FiPlusSquare}>Sell a Car</NavItem>
          </NavLink>

          <NavLink to="/login">
            <NavItem icon={FiHeart}>Favorites</NavItem>
          </NavLink>

          <NavLink to="/login">
            <NavItem icon={FiSettings}>Settings</NavItem>
          </NavLink>
        </>
      )}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        color="white"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "white",
          color: "black",
          transition: "0.5s",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "black",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, loggedUser, logout, user, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <img
          src="https://res.cloudinary.com/dpk07trsw/image/upload/v1677008021/auto-premium/aologo_okqooj.png"
          width={"35px"}
        />
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                {user && user.picture ? (
                  <>
                    <Avatar src={user.picture} size="sm" />
                    <Text>{user.name}</Text>
                  </>
                ) : (
                  <>
                    <Avatar src="public/avataricon.png" size="sm" />
                  </>
                )}
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                ></VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              {loggedUser ? (
                <>
                  <NavLink to={`/profile/${user._id}`}>
                    <MenuItem>Profile</MenuItem>
                  </NavLink>
                  <NavLink to={`/profile/settings/${user._id}`}>
                    <MenuItem>Settings</MenuItem>
                  </NavLink>
                  <MenuDivider />
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <NavLink to="/login">
                    <MenuItem>Login</MenuItem>
                  </NavLink>
                  <NavLink to="/signup">
                    <MenuItem>Signup</MenuItem>
                  </NavLink>
                </>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
