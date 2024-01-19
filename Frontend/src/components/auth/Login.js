import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { BACKEND_URL } from "../../service/BackendUrl";
import { useAuth } from "../../context/GlobalProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const [reg, setReg] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const toast = useToast();

  const handleClick = () => {
    setShow(!show);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // };

      const res = await axios.post(`${BACKEND_URL}/api/user/login`, {
        reg,
        password,
      });

      // console.log(res.data);

      if (res && res.data.success) {
        toast({
          title: res.data && res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        navigate("/dashboard");
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        // console.log(res.data.user);
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
    <VStack spacing="5px">
      <FormControl id="reg" isRequired>
        <FormLabel>Registration No.</FormLabel>
        <Input
          placeholder="Enter Your Registration No."
          value={reg}
          onChange={(e) => setReg(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement w="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="cyan"
        w="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Sign In
      </Button>
      <Button
        variant="solid"
        colorScheme="green"
        w="100%"
        onClick={() => {
          setReg("11111");
          setPassword("12345");
        }}
      >
        Login As Super Admin
      </Button>
      <Button
        variant="solid"
        colorScheme="yellow"
        w="100%"
        onClick={() => {
          setReg("12104444");
          setPassword("12345");
        }}
      >
        Login As Admin
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        w="100%"
        onClick={() => {
          setReg("12345");
          setPassword("12345");
        }}
      >
        Login As Faculty
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        w="100%"
        onClick={() => {
          setReg("12424122");
          setPassword("12345");
        }}
      >
        Login As Moderator In An Event
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        w="100%"
        mb="15px"
        onClick={() => {
          setReg("16578324");
          setPassword("12345");
        }}
      >
        Login As Volunteer In An Event
      </Button>
      <Link to="/forgot-password" className="f-p">
        Forgot Password?
      </Link>
    </VStack>
  );
};

export default Login;
