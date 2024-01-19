import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <GlobalContext.Provider value={[auth, setAuth]}>
      {children}
    </GlobalContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(GlobalContext);

export { useAuth, GlobalProvider };
