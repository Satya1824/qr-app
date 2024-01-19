import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";
import Scanner from "../components/scanner/Scanner";
import Qr from "../components/qr/Qr";
import { useAuth } from "../context/GlobalProvider";
import SuperAdmin from "../components/dashboards/superAdmin";
import SuperAdminDashboard from "../components/dashboards/superAdmin.jsx";
import UpdateRole from "../components/manage/UpdateRole";

const Dashboard = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // console.log(userInfo);

    if (!userInfo) {
      navigate("/");
    }
    // console.log(auth);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <>
      <div className="w-full h-[60px] bg-gray-600 flex flex flex-row items-center justify-between px-5">
        <img
          className="h-[70%] object-contain aspect-square"
          src="https://upload.wikimedia.org/wikipedia/en/3/3a/Lovely_Professional_University_logo.png"
        />
        <div className="flex flex-row items-center gap-x-4">
          {auth?.user?.role === "SuperAdmin" && (
            <UpdateRole>
              <div className=" rounded-full transition-all duration-300 hover:scale-105 cursor-pointer  bg-gradient-to-tl px-5 py-1 font-bold from-red-500 to-blue-900">
                Update Role
              </div>
            </UpdateRole>
          )}
          {auth?.user?.role !== "SuperAdmin" && (
            <div
              onClick={() => {
                navigate("/events");
              }}
              className="rounded-full transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-tl px-5 py-1 font-bold from-red-500 to-blue-900"
            >
              Events
            </div>
          )}

          <div
            onClick={handleLogout}
            className=" rounded-full transition-all duration-300 hover:scale-105 cursor-pointer  bg-gradient-to-tl px-5 py-1 font-bold from-red-500 to-blue-900"
          >
            Logout
          </div>
        </div>
      </div>
      {/* <Button onClick={handleLogout}>Logout</Button> */}
      {/* <Button ms="10px" onClick={() => navigate("/events")}>
        Events
      </Button> */}
      {/* {auth?.user?.role != "SuperAdmin" && ( */}
      <div className="grid">
        {auth?.user?.role === "SuperAdmin" ||
        auth?.user?.role === "admin" ||
        auth?.user?.role === "faculty" ? (
          <>
            <Box>
              <Text>Admin Panel</Text>
              {/* <Scanner /> */}
            </Box>
          </>
        ) : (
          ""
        )}
        <Qr />
      </div>
      {/* )} */}
      {/* {auth?.user?.role == "SuperAdmin" && <SuperAdmin />} */}
    </>
  );
};

export default Dashboard;
