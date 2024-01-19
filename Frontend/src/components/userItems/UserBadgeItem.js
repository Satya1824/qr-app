import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px="2"
      py="1"
      borderRadius="lg"
      m="1"
      mb="2"
      variant="solid"
      fontSize="12"
      color="black"
      bg="white"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user?.reg}
      <CloseIcon color="black" pl="1" />
    </Box>
  );
};

export default UserBadgeItem;
