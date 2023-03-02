import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NewAnnouncement from "./pages/NewAnnouncement";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import IsPrivate from "./components/IsPrivate";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import EditAnnouncement from "./pages/EditAnnouncement";
import Test from "./pages/Test";

import NotFound from "./pages/NotFound";

import UserDetail from "./pages/UserDetail";
import UserSettings from "./pages/UserSettings";
import Favorites from "./pages/Favorites";
import EditPoster from "./pages/EditPoster";
import theme from "./theme/theme";


function App() {
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Navbar>
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

            <Route path="announcements/edit/:announcementId" element={<EditPoster/>}/>

            <Route path="/profile/:userId" element={<UserDetail />} />

            {/*             <Route
              path="/profile/settings/:userId"
              element={
                <IsPrivate>
                  <UserSettings />
                </IsPrivate>
              }
            /> */}

            <Route
              path="/profile/favorites/:userId"
              element={
                <IsPrivate>
                  <Favorites />
                </IsPrivate>
              }
            />

            <Route path="/profile/edit/:userId" element={<UserSettings />} />

            <Route
              path="profile/edit/:userId"
              element={
                <IsPrivate>
                  <EditUser />
                </IsPrivate>
              }
            />
            <Route path="/profile/settings/:userId" element={<Test />} />
          </Routes>
        </Navbar>
      </ChakraProvider>
    </div>
  );
}

export default App;
