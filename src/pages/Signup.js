import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api";
import { useToast } from "@chakra-ui/react";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handlePaswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    try {
      const response = await signup({ email, name, password });
      if (response.data.message) {
        setPassword("");
        setEmail("");
      } else {
        navigate("/");
      }
    } catch (e) {
      console.log(`error ${e}`);
    }
  }

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <h3>Signup</h3>
      <label htmlFor="name">Name </label>
      <Input
        id="name"
        type="text"
        value={name}
        onChange={handleNameChange}
        style={{ width: "300px" }}
      />
      <br />
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email </label>
        <Input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
          style={{ width: "300px" }}
        />
        <br />
        <label htmlFor="password">Password </label>
        <Input
          id="password"
          value={password}
          type="password"
          onChange={handlePaswordChange}
          style={{ width: "100px" }}
        />
        <br />
        <Button type="submit">Signup</Button>
      </form>
      <p>Already have an account?</p>
      <Link to="/login">Login</Link>
    </>
  );
}

export default Signup;
