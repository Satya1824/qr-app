import React from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{ background: "#38B2AC", color: "white" }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px="3"
      py="2"
      mb="2"
      borderRadius="lg"
    >
      <Avatar m="2" size="sm" cursor="pointer" name={user.name} />
      <Box>
        <Text>{user.reg}</Text>
        <Text fontSize="xs">{user.name}</Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
