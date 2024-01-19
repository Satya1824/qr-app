import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../service/BackendUrl";

function SuperAdminDashboard() {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(
        `${BACKEND_URL}/api/superAdmin/listUsers`,
        {
          headers: {
            token: localStorage.getItem("userInfo")?.token,
          },
        }
      );

      console.log(localStorage.getItem("userInfo")?.token);

      console.log(data.users);
      setUsers(data.users);
    })();
  }, []);

  return (
    <div className="flex flex-1 h-[100vh] bg-gray-900 ">
      <div className="w-full mt-8 flex mx-5 overflow-y-scroll rounded-[30px] bg-[#fff2] shadow-white drop-shadow-2xl mb-6 flex flex-col  overflow-hidden">
        <div className="w-full  bg-blue-200  flex flex-row justify-center h-fit text-black font-bold text-[30px] py-2">
          Users
        </div>
        <div className="w-full flex flex-1 /bg-red-100 flex-row gap-x-5 gap-y-3 p-8 px-4 flex-wrap">
          {Users?.map((user) => (
            <div
              key={Math.random()}
              className=" flex flex-row items-center overflow-hidden /p-8"
            >
              <div className="w-[150px] h-[150px] bg-gray-400 rounded-l-xl overflow-hidden">
                <img
                  className="w-full aspect-square "
                  src="https://upload.wikimedia.org/wikipedia/en/3/3a/Lovely_Professional_University_logo.png"
                />
              </div>
              <div className="w-[300px] h-[150px] bg-gray-200 rounded-r-xl flex flex-col pl-2 pr-1 text-gray-900 font-500 pt-3">
                <label>
                  <b>Name </b>
                  {`: ${user.name}`}
                </label>
                <label>
                  <b>Role </b>
                  {` : ${user.role}`}
                </label>
                <label>
                  <b>Email </b>
                  {` : ${user.email}`}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
