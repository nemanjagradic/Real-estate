import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuDivider,
  Flex,
  Box,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [showResMenu, setShowResMenu] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const toogleMenu = () => {
    setIsShowMenu((prevState) => !prevState);
  };

  const showMenu = () => {
    if (window.innerWidth < 1000) {
      setShowResMenu(true);
    }
    if (window.innerWidth > 1000) {
      setShowResMenu(false);
    }
  };

  window.addEventListener("resize", showMenu);

  return (
    <Flex
      position="fixed"
      top="0"
      w="full"
      bg="white"
      zIndex="10"
      align="center"
      py={2}
      px={10}
      borderBottom="1px"
      borderColor="gray.100"
    >
      <Box fontSize="3xl" color="blue.400" fontWeight="bold">
        <Link to="/">realestate.com</Link>
      </Box>
      <Spacer />
      {showResMenu ? (
        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={isShowMenu ? <AiOutlineClose /> : <FcMenu />}
              variant="outline"
              onClick={toogleMenu}
              _expanded={{ bg: "blue.400" }}
            />
            <MenuList>
              <Link to="/">
                <MenuItem icon={<FcHome />}>Home</MenuItem>
              </Link>
              <Link to="/search">
                <MenuItem icon={<BsSearch />}>Search</MenuItem>
              </Link>
              <MenuDivider />
              <Link to="/search?purpose=for-sale">
                <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
              </Link>
              <Link to="/search?purpose=for-rent">
                <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
      ) : (
        <Box>
          <Text
            display="inline-block"
            mx={5}
            fontSize="lg"
            fontWeight="medium"
            _hover={{ color: "blue.400" }}
          >
            <Link to="/">Home</Link>
          </Text>
          <Text
            display="inline-block"
            mx={5}
            fontSize="lg"
            fontWeight="medium"
            _hover={{ color: "blue.400" }}
          >
            <Link to="search">Search</Link>
          </Text>
          <Text
            display="inline-block"
            mx={5}
            fontSize="lg"
            fontWeight="medium"
            _hover={{ color: "blue.400" }}
          >
            <Link to="search?purpose=for-sale">Buy Property</Link>
          </Text>
          <Text
            display="inline-block"
            ml={5}
            fontSize="lg"
            fontWeight="medium"
            _hover={{ color: "blue.400" }}
          >
            <Link to="search?purpose=for-rent">Rent Property</Link>
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export default Navigation;
