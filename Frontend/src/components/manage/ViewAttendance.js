import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalHeader,
  useDisclosure,
  useToast,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../service/BackendUrl";

const ViewAttendance = ({ eventId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  //   console.log(eventId);
  const toast = useToast();

  const [event, setEvent] = useState();

  const [userDetails, setUserDetails] = useState([]);

  const getUser = async (u_id) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/user/get-user/${u_id}`);
      if (res.data && res.data.success) {
        return res.data.userD;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEvent = async () => {
    setLoading(true);
    if (!eventId) {
      toast({
        title: "Event not found!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/event/get-event/${eventId}`
      );

      setEvent(data.eventData);
      const eventD = data.eventData;

      const attendeesPromises = eventD.attendees.map((a) => getUser(a.user));
      const attendeesDetails = await Promise.all(attendeesPromises);
      //   console.log(attendeesDetails);
      setUserDetails(
        attendeesDetails.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        }, {})
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getEvent();
  }, [eventId]);

  return (
    <>
      <Button onClick={onOpen} variant="solid" colorScheme="yellow">
        View Attendance
      </Button>

      <Modal
        isCentered
        isOpen={isOpen}
        size="6xl"
        scrollBehavior="inside"
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bg="#212121">
          <ModalHeader textAlign="center">Attendance List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" justifyContent="center" alignItems="center">
              <table>
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Reg. No.</th>
                    <th>Name</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {event && (
                    <>
                      {event.attendees.map((a, i) => (
                        <tr key={a._id}>
                          <td>{i + 1}</td>
                          <td>{userDetails[a.user]?.reg}</td>
                          <td>{userDetails[a.user]?.name}</td>
                          {a.attended ? (
                            <td className="text-emerald-500">Marked</td>
                          ) : (
                            <td className="text-rose-500">Not Marked</td>
                          )}
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewAttendance;
