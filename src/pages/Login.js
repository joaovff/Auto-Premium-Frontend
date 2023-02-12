import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user.context";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { authenticateUser } = useContext(UserContext);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePaswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem("authToken", response.data);
      authenticateUser();
      navigate("/");
    } catch (e) {
      console.log(`Invalid login`);
    }
  }

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <h3>Login</h3>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
          style={{ width: "300px" }}
        />
        <br />
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          value={password}
          type="password"
          onChange={handlePaswordChange}
          style={{ width: "100px" }}
        />
        <br />
        <Button type="submit">Login</Button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/signup">Signup</Link>
    </>
  );
}

export default Login;
