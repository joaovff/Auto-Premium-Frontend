import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NewAnnouncement from "./pages/NewAnnouncement";
import { ChakraProvider } from "@chakra-ui/react";
import WithSubnavigation from "./components/Navbar";


function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <ChakraProvider>
        <WithSubnavigation />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/announcements/create" element={<NewAnnouncement />} />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
