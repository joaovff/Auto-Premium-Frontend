import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/user.context";

function Navbar() {
  const { loggedUser, logout } = useContext(UserContext);
  return (
    <div>
      {loggedUser ? (
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/announcements/create">New Announcement</NavLink>
          </li>
          <button onClick={logout}>Logout</button>
        </ul>
      ) : (
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navbar;
