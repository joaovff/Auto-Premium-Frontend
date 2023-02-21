import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verify } from "../api";

const UserContext = createContext();

function UserProviderWrapper({ children }) {
  const [loggedUser, setLoggedUser] = useState(null);
  const navigate = useNavigate();
  async function authenticateUser() {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      try {
        const response = await verify(storedToken);
        setLoggedUser(response.data);
      } catch (e) {
        setLoggedUser(null);
      }
    } else {
      setLoggedUser(null);
    }
  }

  function logout() {
    localStorage.clear();
    window.location.reload()
    authenticateUser();
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        authenticateUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProviderWrapper, UserContext };
