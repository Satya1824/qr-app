import React, { useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { Box, Text } from "@chakra-ui/react";

export default function Qr() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const qrCodeRef = useRef(null);

  useEffect(() => {
    if (userInfo && qrCodeRef.current) {
      // Generate the QR code and set it in the component's state
      qrCodeRef.current.makeCode(JSON.stringify(userInfo.user));
    }
  }, [userInfo]);

  return (
    <Box textAlign="center" mt="8">
      <Text fontSize="xl" mb="4">
        This is QR CODE
      </Text>
      <Box p="4" display={"flex"} alignItems={"center"}>
        {userInfo ? (
          <QRCode
            ref={qrCodeRef}
            value={JSON.stringify(userInfo.user)}
            size={320}
          />
        ) : (
          <Text>No user information found.</Text>
        )}
      </Box>
    </Box>
  );
}
