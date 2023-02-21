import { useContext, useEffect, useState } from "react";
import { getFavorites, getUser } from "../api";
import { UserContext } from "../context/user.context";

function Favorites() {
  const [showfavorites, setShowFavorites] = useState([]);
  const { loggedUser } = useContext(UserContext);
  const { user, setUser } = useState(null);
  
  useEffect(() => {
    async function handleLoggedUser() {
      const response = await getUser(loggedUser._id);
      setUser(response.data);
    }
    handleLoggedUser();
    console.log(user);
  }, [loggedUser]);

  return <div>Favorites</div>;
}

export default Favorites;
