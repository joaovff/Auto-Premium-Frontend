import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
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
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
