import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../service/BackendUrl";

const ResetPassword = () => {
  const navigate = useNavigate();

  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (res && data.success) {
        toast({
          title: data && data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        navigate("/");
      } else {
        toast({
          title: data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error resetting password!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setLoading(false);
  };

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        bg={"black"}
        p="3"
        w="100%"
        borderRadius="xl"
        borderWidth="1px"
        m="40px 0 15px 0"
      >
        <Text fontSize="4xl" fontFamily="Work Sans" color="white">
          QR APP
        </Text>
      </Box>
      <Box w="100%" p="4" borderRadius="xl" borderWidth="1px">
        <VStack spacing="5px">
          <FormControl id="password" isRequired>
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter Your New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputRightElement w="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement w="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            mb="15px"
            colorScheme="cyan"
            w="100%"
            style={{ marginTop: 15 }}
            onClick={handleSubmit}
            isLoading={loading}
          >
            Reset Password
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default ResetPassword;
