import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // setUser(userInfo);

    if (userInfo) navigate("/dashboard");
  }, [navigate]);

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
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab w="50%">Sign In</Tab>
            <Tab w="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Auth;
