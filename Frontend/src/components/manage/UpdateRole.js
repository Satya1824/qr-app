import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import UserListItem from "../userItems/UserListItem";
import UserBadgeItem from "../userItems/UserBadgeItem";
import { BACKEND_URL } from "../../service/BackendUrl";

const UpdateRole = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [role, setRole] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleSubmit = async () => {
    setLoading(true);
    if (!role || !selectedUser) {
      toast({
        title: "Kindly fill all the fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    try {
      const res = await axios.put(`${BACKEND_URL}/api/user/update-role`, {
        reg: selectedUser,
        role: role.toLowerCase(),
      });

      if (res && res.data.success) {
        toast({
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setRole();
        setSelectedUser();
        onClose();
      } else {
        toast({
          title: res.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error occured!",
        description: "Failed to update role!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#212121" color="white">
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Update Role
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="University ID"
                mb="1"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              />
            </FormControl>
            <FormControl mt="5px">
              <Select
                placeholder="Select role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Admin</option>
                <option>Faculty</option>
                <option>Student</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={loading}
            >
              Update Role
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateRole;
