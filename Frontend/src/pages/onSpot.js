import React, { useEffect, useState } from "react";
import { Box, Text, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { BACKEND_URL } from "../service/BackendUrl";
import { useAuth } from "../context/GlobalProvider";
import { useNavigate } from "react-router-dom";

const OnSpot = () => {
  const [events, setEvents] = useState([]);
  const [facultyDetails, setFacultyDetails] = useState({});
  const [auth] = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const getAllEvents = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/event/get-events`);
      const allFacultyIds = data?.events.flatMap((event) =>
        event.faculty.map((fac) => fac)
      );

      const facultyData = await axios.get(`${BACKEND_URL}/api/event/faculty`, {
        params: { allFacultyIds },
      });

      setFacultyDetails(
        facultyData?.data?.facultyData.reduce((acc, faculty) => {
          acc[faculty._id] = faculty;
          return acc;
        }, {})
      );

      setEvents(data?.events);
    } catch (error) {
      console.log(error);
    }
  };

  const isUserRegistered = (event) => {
    return event.attendees.some(
      (attendee) => attendee.user.toString() === auth.user._id
    );
  };

  const handleRegister = async (eventId) => {
    try {
      // const userId = auth.user._id;

      const isUserRegistered = (event) => {
        return event.attendees.some(
          (attendee) => attendee.user.toString() === auth.user._id
        );
      };

      const res = await axios.post(`${BACKEND_URL}/api/event/onspot-register`, {
        eventId,
      });

      if (res.data && res.data.success) {
        navigate("/dashboard");
        toast({
          title: "Registration Successful",
          description: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Registration Failed",
          description: res.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      // console.error("Error registering for the event", error);

      toast({
        title: "Registration Failed",
        description: "There was an error while registering for the event.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box
      w="100vw"
      display="flex"
      justifyContent="space-evenly"
      minH="100vh"
      pt="50px"
    >
      <Box w="50%">
        <Text fontWeight="900" fontSize="20px" textAlign="center" mb="30px">
          Events
        </Text>
        {events.map((event) => (
          <Box key={event._id} mb="50px">
            <Text fontWeight="bold" fontSize="xl" mb="2">
              Event Name: {event.title}
            </Text>
            <Text mb="2">Description: {event.description}</Text>
            <Text mb="2" display="flex" justifyContent={"space-between"}>
              <span>Starts on {formatDate(event.startTime)} </span>
              <span>Ends on {formatDate(event.endTime)}</span>
            </Text>
            <Text mb="2" fontWeight="semibold" textAlign="center">
              Faculty In-Charge
            </Text>
            <Box mb="30px">
              {event.faculty.map((facultyId, index) => (
                <Box
                  key={facultyId}
                  display="flex"
                  flexDirection="row"
                  justifyContent={"space-between"}
                  mb="1"
                >
                  <Text>
                    {index + 1}. Faculty Name: {facultyDetails[facultyId]?.name}
                  </Text>
                  <Text>UID: {facultyDetails[facultyId]?.reg}</Text>
                </Box>
              ))}
            </Box>
            {isUserRegistered(event) ? (
              <Box mt="3" mb="2" textAlign="center">
                <Text fontSize="lg" fontWeight="bold" color="green.500">
                  You are already registered for this event.
                </Text>
              </Box>
            ) : (
              <Box mt="3" mb="2" textAlign="center">
                <Button
                  colorScheme="teal"
                  size="md"
                  onClick={() => handleRegister(event._id)}
                >
                  Register
                </Button>
              </Box>
            )}
            <hr></hr>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OnSpot;
