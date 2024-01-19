import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../../service/BackendUrl";
import { useAuth } from "../../context/GlobalProvider";
import UserListItem from "../userItems/UserListItem";
import UserBadgeItem from "../userItems/UserBadgeItem";

const CreateEvent = ({ children }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState([]);
  const [selectedModerators, setSelectedModerators] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [search3, setSearch3] = useState("");
  const [search4, setSearch4] = useState("");
  const [searchResult1, setSearchResult1] = useState([]);
  const [searchResult2, setSearchResult2] = useState([]);
  const [searchResult3, setSearchResult3] = useState([]);
  const [searchResult4, setSearchResult4] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [auth, setAuth] = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleSearch1 = async (query) => {
    setSearch1(query);
    if (!query) {
      return;
    }
    try {
      setLoading1(true);

      const { data } = await axios.get(
        `${BACKEND_URL}/api/user/faculty?search=${search1}`
      );
      setLoading1(false);
      setSearchResult1(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error occured!",
        description: "Failed to search faculty!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    setLoading1(false);
  };

  const handleSearch2 = async (query) => {
    setSearch2(query);
    if (!query) {
      return;
    }
    try {
      setLoading2(true);

      const { data } = await axios.get(
        `${BACKEND_URL}/api/user/students?search=${search2}`
      );
      setLoading2(false);
      setSearchResult2(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error occured!",
        description: "Failed to search students!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    setLoading2(false);
  };

  const handleSearch3 = async (query) => {
    setSearch3(query);
    if (!query) {
      return;
    }
    try {
      setLoading3(true);

      const { data } = await axios.get(
        `${BACKEND_URL}/api/user/students?search=${search3}`
      );
      setLoading3(false);
      setSearchResult3(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error occured!",
        description: "Failed to search students!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    setLoading3(false);
  };

  const handleSearch4 = async (query) => {
    setSearch4(query);
    if (!query) {
      return;
    }
    try {
      setLoading4(true);

      const { data } = await axios.get(
        `${BACKEND_URL}/api/user/students?search=${search4}`
      );
      setLoading4(false);
      setSearchResult4(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error occured!",
        description: "Failed to search students!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    setLoading4(false);
  };

  const handleGroup1 = (userToAdd) => {
    if (selectedFaculty.includes(userToAdd)) {
      toast({
        title: "Student is already added!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedFaculty([...selectedFaculty, userToAdd]);
  };

  const handleGroup2 = (userToAdd) => {
    if (selectedAttendees.includes(userToAdd)) {
      toast({
        title: "Student is already added!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedAttendees([...selectedAttendees, userToAdd]);
  };

  const handleGroup3 = (userToAdd) => {
    if (selectedModerators.includes(userToAdd)) {
      toast({
        title: "Moderator is already added!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedModerators([...selectedModerators, userToAdd]);
  };

  const handleGroup4 = (userToAdd) => {
    if (selectedVolunteers.includes(userToAdd)) {
      toast({
        title: "Student is already added!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedVolunteers([...selectedVolunteers, userToAdd]);
  };

  const handleDelete1 = (deletedUser) => {
    setSelectedFaculty(
      selectedFaculty.filter((sel) => sel._id !== deletedUser._id)
    );
  };

  const handleDelete2 = (deletedUser) => {
    setSelectedAttendees(
      selectedAttendees.filter((sel) => sel._id !== deletedUser._id)
    );
  };

  const handleDelete3 = (deletedUser) => {
    setSelectedModerators(
      selectedModerators.filter((sel) => sel._id !== deletedUser._id)
    );
  };

  const handleDelete4 = (deletedUser) => {
    setSelectedVolunteers(
      selectedVolunteers.filter((sel) => sel._id !== deletedUser._id)
    );
  };

  const createEvent = async () => {
    setLoading1(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/event/create-event`, {
        title,
        description,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        faculty: JSON.stringify(selectedFaculty.map((f) => f._id)),
        attendees: JSON.stringify(selectedAttendees.map((a) => a._id)),
        moderators: JSON.stringify(selectedModerators.map((m) => m._id)),
        volunteers: JSON.stringify(selectedVolunteers.map((v) => v._id)),
      });
      console.log(res.data);
      if (res && res.data.success) {
        toast({
          title: res.data && res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        onClose();
        setTitle("");
        setDescription("");
        setStartTime("");
        setEndTime("");
        setSelectedFaculty([]);
        setSelectedAttendees([]);
        setSelectedModerators([]);
        setSelectedVolunteers([]);
        setSearchResult1([]);
        setSearchResult2([]);
        setSearchResult3([]);
        setSearchResult4([]);
        // getAllEvents();
        window.location.reload();
      } else {
        toast({
          title: res.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      setLoading1(false);
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
    setLoading1(false);
  };

  return (
    <>
      <Button onClick={onOpen}>Create Event</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bg="#212121" color="white">
          <ModalHeader>Create Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Faculty In-Charge</FormLabel>
              <Input
                placeholder="Add Faculty In-Charge"
                mb="1"
                onChange={(e) => handleSearch1(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedFaculty.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete1(u)}
                />
              ))}
            </Box>
            {loading1 ? (
              <Box textAlign="center">loading...</Box>
            ) : (
              searchResult1
                ?.slice(0, 5)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup1(user)}
                  />
                ))
            )}

            <FormControl mt={4}>
              <FormLabel>Moderators</FormLabel>
              <Input
                placeholder="Add Moderators"
                mb="1"
                onChange={(e) => handleSearch3(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedModerators.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete3(u)}
                />
              ))}
            </Box>
            {loading3 ? (
              <Box textAlign="center">loading...</Box>
            ) : (
              searchResult3
                ?.slice(0, 5)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup3(user)}
                  />
                ))
            )}

            <FormControl mt={4}>
              <FormLabel>Volunteers</FormLabel>
              <Input
                placeholder="Add Volunteers"
                mb="1"
                onChange={(e) => handleSearch4(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedVolunteers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete4(u)}
                />
              ))}
            </Box>
            {loading4 ? (
              <Box textAlign="center">loading...</Box>
            ) : (
              searchResult4
                ?.slice(0, 5)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup4(user)}
                  />
                ))
            )}

            <FormControl isRequired mt={4}>
              <FormLabel>Attendees</FormLabel>
              <Input
                placeholder="Add Attendees"
                mb="1"
                onChange={(e) => handleSearch2(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedAttendees.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete2(u)}
                />
              ))}
            </Box>
            {loading2 ? (
              <Box textAlign="center">loading...</Box>
            ) : (
              searchResult2
                ?.slice(0, 5)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup2(user)}
                  />
                ))
            )}

            <FormControl isRequired mt={4}>
              <FormLabel>Event Start Time</FormLabel>
              <Input
                placeholder="Event Start Time"
                size="md"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Event End Time</FormLabel>
              <Input
                placeholder="Event End Time"
                size="md"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              // isLoading={loading}
              colorScheme="blue"
              mr={3}
              onClick={createEvent}
            >
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateEvent;
