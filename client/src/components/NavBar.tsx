import React from "react";
import { Box, Flex } from "@chakra-ui/react";
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  
  return (
    <Flex  zIndex={2} position="sticky" top={0} bg="tomato" p={4}>
      <Box ml={"auto"}></Box>
    </Flex>
  );
};

export default NavBar;
