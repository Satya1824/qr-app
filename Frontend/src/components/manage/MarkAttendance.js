import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../service/BackendUrl";
import { Html5QrcodeScanner } from "html5-qrcode";
import Scanner from "../scanner/Scanner";

const MarkAttendance = ({ eventId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  //   console.log(eventId);
  const toast = useToast();

  const [studentId, setStudentId] = useState();

  const handleScanResult = (result) => {
    setStudentId(result._id);
    // console.log(result._id);
  };

  //   console.log(studentId);

  const handleSubmit = async () => {
    setLoading(true);
    if (!studentId) {
      toast({
        title: "Not scanned any qr yet!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/event/${eventId}/mark-attendance`,
        {
          studentId,
        }
      );

      if (res && res.data.success) {
        toast({
          title: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        onClose();
        setStudentId();
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
      <Button onClick={onOpen} variant="solid" colorScheme="green">
        Mark Attendance
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#212121">
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <Scanner onScanResult={handleScanResult} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button isLoading={loading} onClick={handleSubmit}>
              Mark Attendance
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MarkAttendance;
