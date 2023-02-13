import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NewAnnouncement from "./pages/NewAnnouncement";
import { ChakraProvider } from "@chakra-ui/react";
import IsPrivate from "./components/IsPrivate";
import { useEffect, useState } from "react";
import { getAllAnnouncements } from "./api";
import AnnouncementDetail from "./pages/AnnouncementDetail";

function App() {
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);

  useEffect(() => {
    async function handleGetAllAnnouncements() {
      const response = await getAllAnnouncements();
      setFilteredAnnouncements(response.data);
    }
    handleGetAllAnnouncements();
  }, []);
  return (
    <div className="App">
      <ChakraProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                setFilteredAnnouncements={setFilteredAnnouncements}
                filteredAnnouncements={filteredAnnouncements}
              />
            }
          />
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
          <Route path="/announcements/:announcementId" element={<AnnouncementDetail />} />
        </Routes>
      </ChakraProvider>
    </div>
  );
}

export default App;
