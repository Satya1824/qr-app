import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../service/BackendUrl";

const ForgotPassword = () => {
  const toast = useToast();

  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/forgot-password`, {
        email,
      });
      console.log(res);
      if (res && res.data.success) {
        toast({
          title: res.data && res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setEmail("");
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
      console.log(error);
      toast({
        title: "Something went wrong!",
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
          <FormControl id="email" isRequired>
            <FormLabel>Email ID</FormLabel>
            <Input
              placeholder="Enter Your Registered Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Button
            mb="15px"
            colorScheme="cyan"
            w="100%"
            style={{ marginTop: 15 }}
            onClick={handleSubmit}
            isLoading={loading}
          >
            Reset
          </Button>
          <Link to="/" className="f-p">
            Back To Login
          </Link>
        </VStack>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
