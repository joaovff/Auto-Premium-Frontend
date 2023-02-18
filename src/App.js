import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NewAnnouncement from "./pages/NewAnnouncement";
import { ChakraProvider } from "@chakra-ui/react";
import IsPrivate from "./components/IsPrivate";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import NotFound from "./pages/NotFound";
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/announcements/create"
            element={
              <IsPrivate>
                <NewAnnouncement />
              </IsPrivate>
            }
          />
          <Route
            path="/announcements/:announcementId"
            element={<AnnouncementDetail />}
          />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
